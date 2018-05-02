/*
Class: Pilot
Variables and Functions for the 'Pilot' page on the site

*/

// Import Units
//USEUNIT SiteGlobal

/*
 Function: FillContactName

 Fills Contact Name box with some text

 Parameters: 
 name  - String - Name (text) to fill into the box

 Returns:
 Boolean - True/False on success of filling text
*/
function FillContactName(name)
{
  return SiteGlobal.FillTextByKeys(SiteGlobal.pilotPageURL, "firstname", name);
}

/*
 Function: FillJobTitle

 Fills Job Title box with some text

 Parameters: 
 title - String - Title (text) to fill into the box

 Returns:
 Boolean - True/False on success of filling text
*/
function FillJobTitle(title)
{
  return SiteGlobal.FillTextByKeys(SiteGlobal.pilotPageURL, "jobtitle", title);
}

/*
 Function: FillCompanyName

 Fills Company Name box with some text

 Parameters: 
 companyName - String - Company Name(text) to fill into the box

 Returns:
 Boolean - True/False on success of filling text
*/
function FillCompanyName(companyName)
{
  return SiteGlobal.FillTextByKeys(SiteGlobal.pilotPageURL, "company", companyName);
}

/*
 Function: FillCompanyEmail

 Fills Company Email box with some text

 Parameters: 
 email - String - Email (text) to fill into the box (Not Format restricted)

 Returns:
 Boolean - True/False on success of filling text
*/
function FillCompanyEmail(email)
{
  var result = SiteGlobal.FillTextByKeys(SiteGlobal.pilotPageURL, "email", email);
  //var page = SiteGlobal.GetBrowserPage(SiteGlobal.pilotPageURL);
  
  //page.SetFocus();
  
  return result;
}

/*
 Function: FillPhoneNumber

 Fills Phone Number box with some text

 Parameters: 
 phoneNumber - String - Phone Number (text) to fill into the box (Not Format restricted)
 
 Returns:
 Boolean - True/False on success of filling text

*/
function FillPhoneNumber(phoneNumber)
{
  return SiteGlobal.FillTextByKeys(SiteGlobal.pilotPageURL, "phone", phoneNumber);
}

/*
 Function: ClickSubmitButton

 Clicks the Submit Button on the Pilot page

 Returns:
 Boolean - True/False on success of clicking the button

*/
function ClickSubmitButton()
{
  var button = SiteGlobal.FetchObjectByXpath("http://info.xoi.io/pilot", "//input[@type='submit']");
  if (button != null)
  {
    button.Click();
    Log.Message("Succfully Clicked Submit button.");
    return true;
  }
  return false;
  // TODO: Get the generic ButtonClick to work instead.
  //return SiteGlobal.ButtonClick("SubmitButton", "Submit");
}

/*
 Function: HoverSubmitButton

 Hovers mouse over the Submit Button on the Pilot page

 Returns:
 Boolean - True/False on success of hovering over the button

*/
function HoverSubmitButton()
{
  var button = SiteGlobal.FetchObjectByXpath("http://info.xoi.io/pilot", "//input[@type='submit']");
  if (button != null)
  {
    button.HoverMouse();
    Log.Message("Succfully Hovered over the Submit button.");
    return true;
  }
  return false;
}

/*
 Function: GetContactNameErrorMessage

 Returns the error message for the field (if visible)
 
 Returns:
 String - Required field message. Null if not found

*/
function GetContactNameErrorMessage()
{
  return Pilot.GetRequiredFieldMessage("firstname");
}

/*
 Function: GetCompanyNameErrorMessage

 Returns the error message for the field (if visible)
 
 Returns:
 String - Required field message. Null if not found

*/
function GetCompanyNameErrorMessage()
{
  return Pilot.GetRequiredFieldMessage("company");
}

/*
 Function: GetCompanyEmailErrorMessage

 Returns the error message for the field (if visible)
 
 Returns:
 String - Required field message. Null if not found

*/
function GetCompanyEmailErrorMessage()
{
  return Pilot.GetRequiredFieldMessage("email");
}

/*
 Function: GetRequiredFieldMessage

 Returns the error message for the Required field (if visible)

 Parameters: 
 requiredFieldName - String - Required field name (Ex. "firstname", "company")
 
 Returns:
 String - Required field message. Null if not found

*/
function GetRequiredFieldMessage(requiredFieldName)
{
  var messageObject = SiteGlobal.FetchObjectByXpath("http://info.xoi.io/pilot", 
  // This Xpath uses the input field as an anchor, to then find it's grandparent (the section for the field), the look for a child that is a list with a label.
  // This allows finding the exact message for that field. If you just look for a list with a label, you might find the error message for a different field.
  "//input[@name='" + requiredFieldName + "']/parent::div/parent::div/child::ul[@class='hs-error-msgs inputs-list']//label");
  if (messageObject != null && messageObject.ContentText != "")
  {
    var message = messageObject.ContentText;
    Log.Message("Succfully Found Required Field Message: " + message);
    return message;
  }
  return null;
}

/*
 Function: GetFormsRequiredMessage

 Returns the error message for the Leads form (generic rollup of errors)

 Returns:
 String - Required field message. Null if not found

*/
function GetFormsRequiredMessage()
{
  // Looks for the generic error rollup div, then gets the list with a label in it.
  var messageObject = SiteGlobal.FetchObjectByXpath("http://info.xoi.io/pilot", "//div[@class='hs_error_rollup']/child::ul[@class='hs-error-msgs inputs-list']//label");
  if (messageObject != null && messageObject.ContentText != "")
  {
    var message = messageObject.ContentText;
    Log.Message("Succfully Found Required Field Message: " + message);
    return message;
  }
  return null;
}