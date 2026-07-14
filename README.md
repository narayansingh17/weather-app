# weather-app
A weather application built with HTML, CSS and JavaScript

Commit 1: Designing the UI.

Commit 2: Fetched the api from weather-api and checked if it is working.
  Things I learnt:
    i) Learning the structure of how API call works by reading documentation of weatherapi. It's important to check the example given by them before starting to write the code.
    ii) A bit about request block, I've got to understand it in a deeper way.
  Now i have to render this data on the page and make the next features. Later, I'll have to handle errors.

Commit 3: Designed the UI on which the weather appears. It is almost funtional now with just some more patches and features to 

Commit 4: Handled the errors (Invalid city & city not entered).
          Learnt how to handle errors without letting the site crash by stopping the flow of execution if result is fetched. Else it would've kept running which may crash the website. 
          Also fixed the UI on and after an error being handled.

Final commit: Finally added the 5-day forecast feature. One mistake I made was I manipulated the body of HTML using DOM to get the forecast 
    which made my app getting crashed after one search. There, I learnt that when we manipulate the body using DOM, we destroy our old body and recreate it, which means all elements including search bar were created again and the event listeners are gone. I fixed it by DOM to change it's CSS to display it later.

    Another thing I added was 'Use current location' option, which led me to dive in another thing called Geolocation API. It was fascinating to learn about it and how that works. It was easier to learn about this than weatherapi and a lot smoother.
    This is it for the first version 1.0 of this app. Got to learn about lots of things and was nice experience..