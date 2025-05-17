import sys,os
from twilio.rest import Client
from dotenv import load_dotenv
load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

if not account_sid or not auth_token or not twilio_number:
    print("Please set the environment variables for Twilio credentials.")
    sys.exit(1)


def send_whatsapp_message(to_whatsapp_number, message_body):
    """
    Send a WhatsApp message using Twilio API.

    Parameters:
    - to_whatsapp_number: Recipient's WhatsApp number (10 digits, e.g., '9876543210')
    - message_body: Message to be sent
    """
    if len(to_whatsapp_number) != 10 or not to_whatsapp_number.isdigit():
        print('Invalid Number')
        sys.exit(1)
    to_whatsapp_number = 'whatsapp:+91' + to_whatsapp_number
    client = Client(account_sid, auth_token)
    try:
        message = client.messages.create(
            body=message_body,
            from_="whatsapp:"+twilio_number,
            to=to_whatsapp_number
        )
        print(f"Message sent! SID: {message.sid}")
        return message.sid
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    (file_src, id, name,
    gender, dateOfBirth, phoneNumber,
    bloodType, medicalConditions, medications,
    allergies, notes, registrationDate,
    lastVisit, action) = map(str,sys.argv)

    message = f"""
    Hello {name}, your patient record has been {action} ❤️‍🩹.

    Personal Details:
    ID: {id} 🪪
    Name: {name} 🔤
    Phone Number: {phoneNumber} 📞
    Gender: {gender} 🚻
    Date of Birth: {dateOfBirth} 🎂

    Medical Details:
    Blood Type: {bloodType} 🩸
    Medical Conditions: {medicalConditions} 🩺
    Medications: {medications} 💊
    Allergies: {allergies} 🌼

    Notes: {notes} 📝
    Registration Date: {registrationDate} 📅
    Last Visit: {lastVisit} 🩹

    If you have any questions, please contact us at Radiant Care {chr(128153)}.
    ThankYou :)
    """

    send_whatsapp_message(phoneNumber, message)