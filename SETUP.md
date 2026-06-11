# Installation & Local Development

Follow the steps below to run **Librio Dashboard Design** on your local machine.

## Prerequisites

* Node.js installed on your device
* Terminal access (macOS, Windows, or Linux)

---

## Step 1: Navigate to the Project Directory

Open your terminal and move into the project folder:

```bash
cd "Librio Dashboard Design"
```

> **Important:** Remain inside the `Librio Dashboard Design` directory throughout the entire setup process.

You can verify your current location by running:

```bash
pwd
```

---

## Step 2: Check for pnpm

Before starting the application, verify whether `pnpm` is already installed:

```bash
pnpm --version
```

If your terminal returns a version number, proceed to **Step 5**.

If your terminal displays a message such as `command not found`, continue to the installation steps below.

---

## Step 3: Install pnpm Globally

If `pnpm` is not recognized by your terminal, install it globally using npm:

```bash
npm install -g pnpm
```

If your operating system blocks the installation because of the global (`-g`) flag, rerun the command with administrator privileges:

```bash
sudo npm install -g pnpm
```

> **Note:** On macOS, you may be prompted to enter your user account password. No characters will appear while typing. This is normal security behavior.

Once installation completes, verify the setup:

```bash
pnpm --version
```

---

## Step 4: Install Project Dependencies

After confirming that `pnpm` is installed, download all project dependencies defined within the repository.

Make sure you are still inside the `Librio Dashboard Design` directory, then run:

```bash
pnpm install
```

This command installs all required external packages used by the application.

---

## Step 5: Approve Native Build Dependencies

Certain tooling dependencies (such as Tailwind CSS and Esbuild) may require execution approval.

Run the following command:

```bash
pnpm approve-builds
```

When prompted:

1. Press `a` on your keyboard to select all packages.
2. Press `Enter` to confirm your selection.

---

## Step 6: Start the Development Server

Once dependencies have been installed and approved, boot the local development environment:

```bash
pnpm run dev
```

This command launches the Vite development server.

---

## Step 7: View the Application

After the server starts successfully, your terminal will display a local URL similar to the following:

```text
http://localhost:5173/
```

Copy and paste the generated URL directly into your web browser.

You should now see the **Librio Dashboard Design** application running locally.

---

## Troubleshooting

### `pnpm: command not found`

Install pnpm globally:

```bash
npm install -g pnpm
```

or:

```bash
sudo npm install -g pnpm
```

---

### Dependency installation errors

Confirm that you are inside the correct project directory before running installation commands:

```bash
cd "Librio Dashboard Design"
pwd
```

---

### Local server does not start

Ensure that all dependencies have been installed:

```bash
pnpm install
```

Then restart the development server:

```bash
pnpm run dev
```

---

## Local Development Summary

```bash
cd "Librio Dashboard Design"
pnpm install
pnpm approve-builds
pnpm run dev
```

Open the application at:

```text
http://localhost:5173/
```

Happy building! 🚀
