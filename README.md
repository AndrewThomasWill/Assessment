# Assessment

TestComplete format creates a "TestSuite" (in this case named MasterTestSuite) and a "TestProject" (in this case named MasterTestProject).
Inside this MasterTestProject, I've created a folder named "Framework". <br />
<br />
The structure is the following: <br />
<br />
Framework - Folder <br />
| <br />
|__ (Product) (Ex. XoiSite) - Folder - (Also called 'Module Space') <br />
     | <br />
     |__ (Page or Screen) (Ex. Pilot) - Module/Script <br />

These 'Module Spaces' could be broken down into different Products that are supported by a Framework.
For example, one could be a website, one could be a Desktop application, one could be a Mobile application.
These 'Modules' could then be structured in a 'Page' Module format, where each one relates to a 'Page' on a site or a 'Screen' on an app.
This creates a Framework that is easy to understand, and easy to maintain. There can also be a 'Module' in each 'Module Space' named "XXProductGlobal" that allows shared functions and data across the given 'Module Space'.
For an example see "Framework/XoiSite/SiteGlobal".
