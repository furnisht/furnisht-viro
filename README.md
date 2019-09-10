# Furnisht
##### The Cross-Platform Augmented Reality Application That Makes Your Next Move Easy

Furnisht utilizes Viro React to obtain coordinates of a room to create a 2-d floor plan, with furniture modeled as 3d objects. 

INSERT PICTURE HERE

##Getting Started
**1.** Since Furnisht is a mobile app and uses ViroReact AR technology, the user must download ViroMedia from your smartphone’s app store.
**2.** `git clone` this repository to your local computer.
**3.** In your computer’s terminal, run `npm install`, and then run `npm start`
**4.** Open Viro Media on your phone and navigate to the hamburger menu on the top left corner.
**5.** Click on “Enter Testbed” and enter the ngrok key that is displayed in your terminal after running npm start. 
**6.** Wait for Furnisht to bundle, and for the splash screen to appear. 


 
Furnisht has three buttons on its main screen:
 
####Furnish
When clicking the furnish button, the user can input the dimensions of furniture that they already own, and see what their furniture would look in a new space. 
 
 
INSERT FURNISH PICTURE
 
 
####Floor Plan
The Floor Plan functionality of Furnisht allows a user to calculate a room’s area, and create a 2d scaled floor plan of a space. 
 
 
 
To create a floor plan:
**1.** Drag the green arrow to the first corner of the room that you would like to measure
**2.** `Click the `+` 3D button to create another green arrow and drag to the next corner that you would like to measure. Repeat until all corners of the room have a green arrow representing the corner
**3.** Click the :check button when finished. You will now see a scaled version of your floorplan, scaled to NUMBER of its size, with the area of the space floating on the AR screen. Your scaled floor plan will automatically be saved, and be available via the `Projects` button

INSERT FLOOR PLAN PICTURES

####Projects
Users have the capability to play around with scaled versions of their floor plans and furniture to see how their furniture will fit in different spaces. All furniture and floor plans are scaled to NUMBER of their size. User can rotate floor plans and furniture over and over until furniture fits perfectly in their space!

INSERT PROJECTS PICTURE


Make sure the job is fully Furnisht!

using AR, be able to make a model of the room with pointers like homestory (uses reactnativeARkit, 3dio.js)
store that room
QUESTION: is there a distinction between getting the dimensions of a room that you're inside of, and an object that you're "outside of"
if not, we can use the same mechanism for getting dimensions of objects
if they are different, we can have a way for users to input dimensions manually
then, use **three.js or 3dio.js** to create generic 3d models of objects
store that object
once we have a generic 3d model of the room and its furniture (independently)
react native drag and drop, react-beautiful-drag-and-drop to place things into the model
double tap to rotate
