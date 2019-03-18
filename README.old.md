# Weather singlepage application

Acceptance criteria:
- Application should provide 7-day (or less if there any API restrictions) forecast starting from today;
- City can be selected by name or current geo-coordinates can be used;
- In the list temperature should be shown for a daytime, icons should be neutral;
- In the section "Current weather" the temperature and icon depend on the current time;
- According to changes in control "Scale's type" (C or F) convert temperature from Celsius to Fahrenheit or vice versa;
- If page was reloaded then application should restore state (if any city was selected by name or coordinates, it should be shown saved forecast, but in background, app should ask about new data);
- Make it responsive (suggest your option for mobile)
- The result should be available in a Git repository (on Github or Bitbucket for example)
- We don't have strong requirements about JS frameworks, but we're using React in our project, would be nice to use it for test assignment;
- CSS frameworks shouldn't be used for this test assignment. Preferably use a CSS preprocessor (Stylus, Sass, etc…)

- It should work as single page application. Although this specific task can be done in a more simple way, it is important that you use some package manager and other tools (like task runners or JS transpilers and CSS preprocessors)

Before you start:
- font family – Roboto;
- you can use this API http://openweathermap.org/api or any other, or create mock API on your own;
