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
  return SiteGlobal.FillTextByKeys(SiteGlobal.pilotPageURL, "email", email);
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
  // TODO: Get the generic ButtonClick to work instead.
  //return SiteGlobal.ButtonClick("SubmitButton", "Submit");
}

function test()
{
  GetRequiredFieldMessage();
}

/*
 Function: GetRequiredFieldMessage

 Returns the "complete this required field message"

 Returns:
 String - Required field message. Null if not found

*/
function GetRequiredFieldMessage()
{
  var messageObject = SiteGlobal.FetchObjectByXpath("http://info.xoi.io/pilot", "//ul[@class='hs-error-msgs inputs-list']/li/label");
  if (messageObject != null && messageObject.ContentText != "")
  {
    var message = messageObject.ContentText;
    Log.Message("Succfully Found Required Field Message: " + message);
    return message;
  }
  return null;
}