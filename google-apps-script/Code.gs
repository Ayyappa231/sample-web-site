const SHEET_NAME = "Responses";
const PROP_SHEET_ID = "RESPONSE_SHEET_ID";
const PROP_ADMIN_KEY = "RESPONSE_ADMIN_KEY";

function setup() {
  const props = PropertiesService.getScriptProperties();

  let id = props.getProperty(PROP_SHEET_ID);
  let ss = id ? SpreadsheetApp.openById(id)
              : SpreadsheetApp.create("Romantic Date Website - Responses");

  props.setProperty(PROP_SHEET_ID, ss.getId());

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Activity", "Submitted At"]);
    sheet.setFrozenRows(1);
  }

  let key = props.getProperty(PROP_ADMIN_KEY);

  if (!key) {
    key = Utilities.getUuid().replaceAll("-", "");
    props.setProperty(PROP_ADMIN_KEY, key);
  }

  Logger.log("Spreadsheet: " + ss.getUrl());
  Logger.log("ADMIN KEY: " + key);
}

function getSheet_() {
  const id = PropertiesService.getScriptProperties()
    .getProperty(PROP_SHEET_ID);

  if (!id) throw new Error("Run setup() first.");

  return SpreadsheetApp.openById(id).getSheetByName(SHEET_NAME);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const p = e.parameter || {};

    if (p.action !== "save") {
      return json_({ok:false,error:"Invalid action."});
    }

    const date = String(p.date || "").trim();
    const activity = String(p.activity || "").trim();

    const allowed = [
      "Movie",
      "Coffee",
      "Ice Cream",
      "Park",
      "Beach"
    ];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return json_({ok:false,error:"Invalid date."});
    }

    if (!allowed.includes(activity)) {
      return json_({ok:false,error:"Invalid activity."});
    }

    getSheet_().appendRow([
      date,
      activity,
      new Date()
    ]);

    return json_({ok:true});

  } catch (err) {
    return json_({ok:false,error:String(err)});
  }
}

function doGet(e) {
  try {
    const p = e.parameter || {};

    if (p.action !== "list") {
      return json_({
        ok:true,
        message:"Romantic Date response service is running."
      });
    }

    const savedKey = PropertiesService.getScriptProperties()
      .getProperty(PROP_ADMIN_KEY);

    if (!savedKey || p.key !== savedKey) {
      return json_({
        ok:false,
        error:"Invalid admin key."
      });
    }

    const values = getSheet_().getDataRange().getValues();

    const rows = values.slice(1).reverse().map(row => ({
      date: formatDate_(row[0]),
      activity: String(row[1] || ""),
      submittedAt: formatDateTime_(row[2])
    }));

    return json_({
      ok:true,
      rows:rows
    });

  } catch (err) {
    return json_({
      ok:false,
      error:String(err)
    });
  }
}

function formatDate_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(
      value,
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );
  }

  return String(value || "");
}

function formatDateTime_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(
      value,
      Session.getScriptTimeZone(),
      "yyyy-MM-dd HH:mm:ss"
    );
  }

  return String(value || "");
}