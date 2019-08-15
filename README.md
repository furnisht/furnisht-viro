# furnisht-viro
Repo for our furnisht capstone project

NORMS
people can work if they want to, but they don't have to
if you do work, please make sure to debrief before and after and not to do too much independent work that other people can't catch up
if it's meaty, make strides together, if it's a tiny thing, you can probably work independently
communicate when you can and can't work
take breaks when you need to
make a trello board
we'll have a scrummaster and gitmaster

TIERS:
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
