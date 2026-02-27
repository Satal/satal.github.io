---
title: Disable Your VPN Automatically When Using Android Auto with Tasker and WG Tunnel
date: '2026-02-27T11:30:00+00:00'

permalink: /disable-vpn-android-auto-tasker/
author: Satal

tags:
  - Android
  - Tasker
  - VPN
  - WireGuard
  - Android Auto
---

If you use a VPN on your Android phone via [WG Tunnel](https://github.com/zaneschepke/wgtunnel) (formerly WireGuard Auto Tunnel), you may have noticed issues when connecting to Android Auto in your car. The VPN can interfere with Android Auto's connectivity, causing lag, disconnections, or features not working properly.

The solution is to automatically disable the VPN whenever Android Auto connects, and re-enable it when you disconnect. This can be achieved using [Tasker](https://tasker.joaoapps.com/), the powerful Android automation app.

## What You Need

- **WG Tunnel** - installed and configured with your WireGuard VPN
- **Tasker** - installed from the Play Store
- **Android Auto** - set up and working in your car

## Overview

We are going to create two Tasker profiles:

1. One that **stops the VPN tunnel** when Android Auto connects
2. One that **starts the VPN tunnel** when Android Auto disconnects

Each profile will have an associated task that sends a broadcast intent to WG Tunnel, telling it to either stop or start the tunnel.

## Step 1: Create the "Turn Off WireGuard" Task

First, we will create the task that tells WG Tunnel to stop the tunnel.

1. Open **Tasker** and go to the **Tasks** tab
2. Tap the **+** button to create a new task
3. Name it **Turn Off Wireguard** and tap the tick to confirm
4. Tap the **+** button to add an action
5. Select **System** > **Send Intent**
6. Fill in the following fields:
   - **Action**: `com.zaneschepke.wireguardautotunnel.STOP_TUNNEL`
   - **Target**: select **Broadcast Receiver**
   - **Package**: `com.zaneschepke.wireguardautotunnel`
   - **Class**: `com.zaneschepke.wireguardautotunnel.core.broadcast.RemoteControlReceiver`
7. Tap the back arrow to save the action

## Step 2: Create the "Turn On WireGuard" Task

Now create a matching task to restart the tunnel.

1. Go to the **Tasks** tab
2. Tap the **+** button to create a new task
3. Name it **Turn On Wireguard** and tap the tick to confirm
4. Tap the **+** button to add an action
5. Select **System** > **Send Intent**
6. Fill in the following fields:
   - **Action**: `com.zaneschepke.wireguardautotunnel.START_TUNNEL`
   - **Target**: select **Broadcast Receiver**
   - **Package**: `com.zaneschepke.wireguardautotunnel`
   - **Class**: `com.zaneschepke.wireguardautotunnel.core.broadcast.RemoteControlReceiver`
7. Tap the back arrow to save the action

The only difference between the two tasks is the **Action** field: `STOP_TUNNEL` vs `START_TUNNEL`.

## Step 3: Create the Android Auto Profile

Now we need to create a profile that triggers these tasks when Android Auto connects and disconnects.

1. Go to the **Profiles** tab
2. Tap the **+** button to create a new profile
3. Select **State** > **App** > **Android Auto Connected**
4. Tap the back arrow to confirm the condition
5. Tasker will ask you to select a task for when the condition is met - select **Turn Off Wireguard**
6. The profile will be created. Now long-press on the profile and tap **Add Exit Task**
7. Select **Turn On Wireguard**

Your profile should now show:

- **Enter task**: Turn Off Wireguard (runs when Android Auto connects)
- **Exit task**: Turn On Wireguard (runs when Android Auto disconnects)

## Step 4: Enable the Profile

Make sure the profile is enabled by checking that the toggle next to it is turned on. You can also ensure Tasker itself is active by checking the notification in your status bar.

## Testing

To test that everything is working:

1. Check that your VPN is currently active in WG Tunnel
2. Connect your phone to your car's Android Auto (either via USB or wirelessly)
3. Verify that the VPN disconnects
4. Disconnect from Android Auto
5. Verify that the VPN reconnects

If the VPN does not toggle as expected, check that Tasker has the necessary permissions. You may need to disable battery optimisation for Tasker to ensure it can run in the background reliably.

## Troubleshooting

- **Tasker not triggering**: Ensure Tasker is excluded from battery optimisation in your phone's settings. Some manufacturers aggressively kill background apps.
- **WG Tunnel not responding to intents**: Make sure you are running a recent version of WG Tunnel that supports remote control via broadcast intents. Check that the app has not been restricted by your phone's settings.
- **Android Auto state not detected**: Some phones require additional permissions for Tasker to detect Android Auto. Check Tasker's permissions in your phone's app settings.

## Why This Is Needed

VPNs can cause issues with Android Auto because the tunnel can interfere with the local network communication between your phone and the car's head unit. By automatically disabling the VPN during Android Auto sessions, you get a seamless driving experience without having to remember to manually toggle your VPN every time you get in and out of the car.
