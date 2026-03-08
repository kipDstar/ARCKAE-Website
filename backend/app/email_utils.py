import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Iterable, Optional

from fastapi import BackgroundTasks

from .config import get_settings


settings = get_settings()


def _build_message(
    subject: str,
    body: str,
    recipients: Iterable[str],
    from_address: Optional[str] = None,
) -> MIMEMultipart:
    msg = MIMEMultipart()
    msg["From"] = from_address or settings.smtp_from or "no-reply@example.com"
    msg["To"] = ", ".join(recipients)
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))
    return msg


def _send_email_sync(msg: MIMEMultipart) -> None:
    if not settings.smtp_host or not settings.smtp_username or not settings.smtp_password:
        # Email is optional; silently skip if not configured
        return

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        if settings.smtp_use_tls:
            server.starttls()
        server.login(settings.smtp_username, settings.smtp_password)
        server.send_message(msg)


def send_email_background(
    background_tasks: BackgroundTasks,
    subject: str,
    body: str,
    recipients: Iterable[str],
) -> None:
    msg = _build_message(subject, body, recipients)
    background_tasks.add_task(_send_email_sync, msg)

