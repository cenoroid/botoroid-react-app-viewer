# About

This is a loyalty points managing extension, with goals, redemptions and other ways for viewers to interact with the stream.

# Walkthrough

User obtains loyalty points by showing up early, winning raffles, converting channel points, subscribing, cheering or donating,
which they can spend in community goals or the store.
Streamer can remove requests, goals or redemptions from an external webpage dedicated to the extension.
Test channel is live 24/7.

User can:

- drag each container from it's header
- minimize/maximize each container
- add points towards a goal
- redeem an item from the store
- click on chests that appear on an interval

# Changelog

## v0.0.1

- request list: displays requests and a timer
- goals: displays any current goals and the progress
- store: this is where the user can redeem cbucks for rewards
- chests: every one hour a chest will appear, that rewards some cbucks

## v0.0.2

- implemented react-redux
- added a button to toggle the grant access dialogue box for new users
- added a toggle button to expand or collapse the request list, keeping only the header and the first request when colapsed
- fixed chests

## v0.0.3

- [] reuse grantaccesstoggle to open/close store
  add settings in store
  reset UI button
- [] error message, when not enough cbucks
- [] try react use gesture for drag
- [?] make goals resizable
