/*
Class: SiteGlobal
Site Variables and Functions that can be used by all lower Modules
- SiteGlobal
  - MiscModule1 (useunit SiteGlobal)
  - MiscModule2 (useunit SiteGlobal)
*/

//Import Units


// Page URLs
var pilotPageURL = "http://info.xoi.io/pilot";

// Timing Variables
var blinkWaitSeconds = 1;
var quickWaitSeconds = 2;
var moderateWaitSeconds = 5;
var maxWaitSeconds = 10;

/*
 Function: FillTextByKeys

 Fills an object with text by using 'Keys' to key in the text.
 This method of entering the text was chosen because 
 setting the "wText", "Text" or other properties sometimes don't trigger web apps actions.

 Parameters: 
 pageURL      - String - URL of the page with the object (must be current page)
 objectName   - String - Name of the object to fill with text.
 fillText     - String - Text to fill the object with

 Returns:
 Boolean - True/ False if the value was entered
*/
function FillTextByKeys(pageURL, objectName, fillText)
{
  try
  {
    var object = SiteGlobal.WaitForObjectByXpath(pageURL, "//input[@name='" + objectName + "']");
    
    if (object != null && object.Exists && object.Enabled && object.Visible)
    {
      object.Keys("^a"); // Select all text inside
      object.Keys("[Del]"); // Delete all values
      object.Keys(fillText);
      aqUtils.Delay(SiteGlobal.blinkWaitSeconds);
    }
    
    return (object.value == fillText); 
  }
  catch (exception)
  {
    Log.Error("Exception occurred in FillTextByKeys(): " + exception.description);
  }
}

/*
 Function: WaitForObjectByXpath

 Waits for the object (with given Xpath) to be found

 Parameters: 
 page  - String - URL of the page with the object (must be current page)
 xPath - String - Xpath of the object on the page
 
 Returns:
 Object - (Null) if not found

*/
function WaitForObjectByXpath(page, xPath)
{
  try
  {
    var maxAttempts = 20
    var counter = 0;
    var object = null;
  
    if(!SiteGlobal.WaitForPageLoad(page)) {return null;}
    
    do 
    {
      object = SiteGlobal.FetchObjectByXpath(page, xPath);
      if (object != null) {return object;}
      counter++;
      aqUtils.Delay(500);
    }while (counter < maxAttempts)
    
    Log.Error("Failed to find object (by xpath) after waiting. Page: " + pageURL + " xPath: " + xPath);
    return null;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in WaitForObjectByXpath(): " + exception.description);
  }
}

/*
 Function: WaitForPageLoad

 Waits for the given page to be loaded

 Parameters: 
 pageURL  - String - URL of the page waiting to load
 
 Returns:
 Boolean - True/ False if the page loaded

*/
function WaitForPageLoad(pageURL)
{
  try
  {
    var maxAttempts = 20; // Half a second each time. Reaching SiteGlobal.maxWaitSeconds
    var counter = 0;
    
    do
    {
      var page = SiteGlobal.GetBrowserPage(pageURL);
      if (page.Exists == true) 
      {
        Log.Message("Page: " + pageURL + " loaded successfully after " + counter + " times.");
        return true;
      }  
      counter++;
      aqUtils.Delay(500);
    
    }while (counter < maxAttempts)
    
    Log.Error("Failed to load the page: " + pageURL);
    return false;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in WaitForPageLoad(): " + exception.description);
  }
}

/*
 Function: GetBrowserPage

 Getting the page object (of the provided URL)

 Parameters: 
 pageURL  - String - URL of the page with the object (must be current page)
 
 Returns:
 Page object (Check for .Exists if you need to validate)
 
*/
function GetBrowserPage(pageURL)
{
  // TODO: Update needed for chrome compatability
  return Sys.Browser("iexplore").Page(pageURL);
}

/*
 Function: AssertCurrentPageEqualsURL

 Asserting the current page is at the url given

 Parameters: 
 pageURL  - String - URL of the page with the object (must be current page)
 
 Returns:
 Boolean - True/False if current page is the given url
 
*/
function AssertCurrentPageEqualsURL(pageURL)
{
  // TODO: Update needed for chrome compatability
  var currentURLPage = Sys.Browser("iexplore").Page(pageURL);
  
  if (currentURLPage.Exists)
  {
    Log.Message("Asserted given URL: " + pageURL + " Exists and is the current page.");
    return true
  }
  return false;
}

/*
 Function: FetchObjectByXpath

 Fetches the object (with given Xpath)

 Parameters: 
 pageURL  - String - URL of the page with the object (must be current page)
 xPath    - String - Xpath of the object on the page
 
 Returns:
 Object - (Null) if not found

*/
function FetchObjectByXpath(pageURL, xPath)
{
  try
  {
    var page = SiteGlobal.GetBrowserPage(pageURL);
    if (!page.Exists)
    {
      Log.Error("Failed to get Page: " + pageURL + " when searching for xPath: " + xPath);
      return null;
    }
    
    var object = page.FindChildByXPath(xPath, true);
    
    if (object != null && object.Exists && (object.Visible || object.Enabled))
    {
      Log.Message("Object found at Page: " + pageURL + " and xPath: " + xPath);
      return object;
    }
    
    Log.Error("Failed to fetch object (by xpath). Page: " + pageURL + " xPath: " + xPath);
    return null;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in FetchObjectByXpath(): " + exception.description);
  }
}

// TODO: Get Function working to look at properties.
/*
 Function: FetchObjectByProperty

 Fetches the Object using two property names and value (allows more specificity)

 Parameters: 
 objectParent  - Object - Parent that should have the child object
 propType1     - String - Property to search for
 propValue1    - String - Property value required in propType1
 propType2     - String - Property to search for
 propValue2    - String - Property value required in propType2
 
 Returns:
 Object - (Null) if not found

*/
/*
function FetchObjectByProperty(objectParent, propType1, propValue1, propType2, propValue2)
{
  try
  {
    if (objectParent == null || !objectParent.Exists)
    {
      Log.Error("Parent object given is null or undefined: '" + objectParent + "'.")
      return null;
    }
  
    var maxAttempts = 20; // Just general case. Can change if needed.
    var counter = 0;
    var childObject = null;
    var arrayPropTypes = new Array(propType1, propType2);
    var arrayPropValues = new Array(propValue1, propValue2);
  
    do
    {
      childObject = objectParent.FindChild(arrayPropTypes, arrayPropValues, 50); // Stable enough number. Can change if needed.
      if (childObject != null && childObject.Exists)
			{
			  Log.Message("Object with property type '" + propType1 + "' and value '" + propValue1 + "' is found OR " +
        "Object with property type '" + propType2 + "' and value '" + propValue2 + "' is found.");
			  return childObject; 
			}
			counter++;
      Delay(100);
      
    }while (counter < maxAttempts)

    Log.Error("Failed to find Object with property type '" + propType1 + "' and value '" + propValue1 + "' OR " +
        "Failed to find Object with property type '" + propType2 + "' and value '" + propValue2 + "'.");
    return null;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in FetchObjectByProperty(): " + exception.description);
  }
}*/

/*
 Function: NavigateBrowser

 Navigates the current browser to a given page (with a max time)

 Parameters: 
 pageURL       - String - URL of the page with the object (must be current page)
 maxLoadTime   - Number - Name of the object to fill with text.

 Returns:
 Boolean - True/False if navigation was successful
*/
function NavigateBrowser(pageURL, maxLoadTime)
{
  try
  {
    if (Browsers.CurrentBrowser == null)
    {
      Log.Error("Browser not 'Launched' through 'LaunchNewBrowser()'. Call that function to launch browser.");
      return false;
    }
    Browsers.CurrentBrowser.Navigate(pageURL, maxLoadTime);
    var page = SiteGlobal.GetBrowserPage(pageURL);
    
    if (page.Exists && (pageURL == page.Url))
    {
      Log.Message("Page: " + pageURL + " was navigated to.");
      return true;
    }
    
    Log.Error("Failed to navigate to Page: " + pageURL);
    return false;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in FetchObjectByXpath(): " + exception.description);
  }
}

/*
 Function: LaunchNewBrowser

 Opens browser with a given page URL

 Parameters: 
 browserName   - String - "iexplore" only at this time.
 pageURL       - String - URL of the page with the object (must be current page)

 Returns:
 Boolean - True/False if launching was successful
*/
function LaunchNewBrowser(browserName, pageURL)
{
  try
  {
    if (aqString.Compare(browserName, "iexplore", true) != 0) //&& aqString.Compare(browserName, "chrome", true) != 0)
    {
      Log.Error("Incorrect parameter sent to LaunchNewBrowser(). Please send 'iexplore' for now.")
      return false;
    }

    Browsers.Item(browserName).RunOptions = "";
    Browsers.Item(browserName).Run(pageURL);

    var page = SiteGlobal.GetBrowserPage(pageURL);
    
    if (page.Exists && (pageURL == page.Url))
    {
      Log.Message("Browser: " + browserName + " launched and Page: " + pageURL + " was navigated to.");
      return true;
    }
    
    Log.Error("Failed to launch Browser: " + browserName + " and navigate to Page: " + pageURL);
    return false;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in LaunchNewBrowser(): " + exception.description);
  }
}

/*
 Function: CloseBrowser

 Closes Browser

 Returns:
 Boolean - True/False if closing was successful
*/
function CloseBrowser()
{
  try
  {
    // If it is open
    if (Sys.WaitProcess("iexplore", 500).Exists)
    {
      Sys.Browser("iexplore").Terminate();
      if (Sys.WaitProcess("iexplore", 500).Exists)
      {
        Log.Error("Failed to close browser.");
        return false;
      }
    }
    
    Log.Message("Browser was (or is) closed.")
    return true;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in CloseBrowser(): " + exception.description);
  }
}


// TODO: Get generic ButtonClick to work.
/*
 Function: ButtonClick

 Clicks a button (given buttonName and buttonValue (or text))

 Parameters: 
 buttonName   - String - Button Name on the screen
 buttonValue  - String - Button Value (or text) for the button

 Returns:
 Boolean - True/False if launching was successful
*/
/*
function ButtonClick(v1, v2)
{
  try
  {
    // TODO: Update needed for chrome compatability
    var button = SiteGlobal.FetchObjectByProperty(Sys.Browser("iexplore"),"ObjectType", v1, "Name", v2);
  
    if (button != null && button.Visible && button.Enabled)
    {
      button.Click();
      aqUtils.Delay(SiteGlobal.blinkWaitSeconds);
      Log.Message("Succefully clicked Button with Name: " + buttonName + " or value: " + buttonValue);
      return true;
    }

    Log.Error("Failed to click Button with Name: " + buttonName + " or value: " + buttonValue);
    return false;
  }
  catch (exception)
  {
    Log.Error("Exception occurred in ButtonClick(): " + exception.description);
  }
}*/






