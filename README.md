# Romantic Date Website + Online Responses 💕

The website remains on GitHub Pages. Responses are saved to a private Google Sheet through Google Apps Script.

## Setup

1. Open `google-apps-script/Code.gs`.
2. Go to Google Sheets -> Extensions -> Apps Script.
3. Paste the Code.gs contents.
4. Run `setup()` once and approve permissions.
5. Open the execution log and copy the ADMIN KEY.
6. Deploy -> New deployment -> Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Copy the deployed `/exec` URL.
10. Edit `js/config.js` and replace the placeholder with the URL.
11. Commit all website files to GitHub Pages.

## View responses

Open:

`https://ayyappa231.github.io/sample-web-site/responses.html`

Enter the ADMIN KEY to see the date, activity and submission time.

The admin key is not stored in the GitHub website.
