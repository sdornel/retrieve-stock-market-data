npm test -- --detectOpenHandles
Running Jest with the --detectOpenHandles flag can provide insights into what's causing Jest to hang. This flag helps identify potential reasons for Jest not exiting cleanly by listing out resources that were still open after tests completed.

