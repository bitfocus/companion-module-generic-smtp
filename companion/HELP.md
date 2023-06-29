## Generic SMTP

### Features

- Send emails to multiple recipients
- CC and BCC recipients
- Use variables in any field

### Usage

**Send Email**

- **Recipient _(optional)_**  
  Several can be seperated by a comma  
  Can be written like this `Bob Smith <bob@email.com>` to specify a name
- **Reply-to _(optional)_**  
  Specify the name and email address that shows up when replying to the email
- **CC and BCC _(optional)_**  
  Several can be seperated by a comma
- **Subject _(required)_**  
  The subject just as in any email
- **Message _(required)_**  
  You can use HTML syntax to format your message e.g. `<br/>` for a line break

### Setup

**Gmail**

- Enable 2FA on your Gmail account
- Go to [App Passwords](https://myaccount.google.com/apppasswords) on your Google account settings
- Create a new app password for Companion

**Other Services**

Please follow the guides on how to set up SMTP for your email service.
