#!/bin/bash

# Open backend in a new terminal window
gnome-terminal -- bash -c "cd backend && npm start; exec bash" &

# Open frontend in a new terminal window
gnome-terminal -- bash -c "cd frontend && npm run dev; exec bash" &
