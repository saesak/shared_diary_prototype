Working video of project: 
https://www.youtube.com/watch?v=skjK6QLLe6M

Summary of Project: This project is a prototype of a shared diary, where users can write an online
diary together and look at each others' diaries. Currently, the functionalities of this diary are
1. writing and saving an entry and 2. looking at what entries are stored on the database

Features: 
Frontend - Components
Full stack - linking together a front and back end
Backend - api calls, integration with database

Time spent:
In truth, this is part of a personal project I worked on a couple weeks ago then stopped working on.
I didn't have any great ideas, and I wanted to keep this project going, so I spent 3.5 hours developing this idea,
slapping on some of the requirements that were listed in the developer applications page. 
Back then, I had implemented the diary entry where you could both use touch and mouse to draw on the
diary as well. This time, I implemented the time display, routing, backend, created an sql db and 
the code storing and getting the data from the sql db. I also implemented the page where you can see
your own entries. This took more time than expected because figuring out how to store the canvas(ended up using blob)
and text(while preserving newlines) into a database was tricky, and a problem with my initial version of sql
caused me to have to reinstall it from scratch. 

Links I referred to:

https://www.geeksforgeeks.org/how-to-create-a-paint-app-in-reactjs/
However, this was not completely copy and pasted - I still fixed a couple buggy features
and implemented touch features for stylus users, and added the option to switch
between text and drawing modes. 

Notes:
React Paradigm --> pass data down from parent to children, pass actions up so they get executed in parent
