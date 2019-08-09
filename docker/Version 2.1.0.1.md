2.1.0.1 (37199)
This release contains a Kubernetes upgrade. Your local Kubernetes cluster will be reset after install.

Upgrades
--
Docker 19.03.1 
Docker Compose 1.24.1 
Kubernetes 1.14.3 
Compose on Kubernetes 0.4.23 
Docker Machine 0.16.1 
linuxkit v0.7 
Linux Kernel 4.9.184 
Kitematic 0.17.6 
Qemu 4.0.0 for cross compiling for ARM 
Alpine 3.10 
Docker Credential Helpers 0.6.3 
New

Checking the experimental checkbox in Daemon Settings will turn on experimental features for docker daemon AND docker CLI. 
Check stored credentials at start up before attempting to mount any shared drives, prompting the user to re-enter the credentials if the credentials are invalid. 
Experimental

App: Docker CLI Plugin to configure, share and install applications 
Extend Compose files with metadata and parameters 
Re-use same application across multiple environments (Development/QA/Staging/Production) 
Multi orchestrator installation (Swarm or Kubernetes) 
Push/Pull/Promotion/Signing supported for application, with same workflow as images 
Fully CNAB compliant 
Full support of Docker Contexts 
Buildx (Tech Preview): Docker CLI plugin for extended build capabilities with BuildKit 
Familiar UI from docker build 
Full BuildKit capabilities with container driver 
Multiple builder instance support 
Multi-node builds for cross-platform images (out-of-the-box support for linux/arm/v7 & linux/arm64) 
Parallel building of compose files 
High-level build constructs with bake 
Bug fixes and minor changes

Fix PowerShell script signing issue that caused ‘AuthorizationManager check failed’ errors on machines with strict group policies on PowerShell script signing docker/for-win#4376. 
Fix an issue where users were unable to start Docker Desktop after upgrading to version 2.1.0.0 docker/for-win#4390. 
Fix an issue where attempts to upgrade Docker Desktop to version 2.1.0.0 sometimes failed with the error value cannot be null docker/for-win#4343 
Improve the error messages displayed during VM lifecycle operations docker/for-win#4348. 
Docker Desktop now supports a configurable user timeout for VMs on slower machines docker/for-win#4393. 
Fix an issue that caused the installer to hang when upgrading Docker Desktop to version 2.1.0.0 docker/for-win#4387. 
Change the host’s kubernetes context so that docker run -v .kube:kube ... kubectl works. 
Restrict cluster-admin role on local Kubernetes cluster to kube-system namespace. 
Reduce startup time: swap is not recreated for each virtual machine boot 
Do not crash when user cancels switching the version using Windows UAC 
Fix Docker Desktop restart after a Windows logout / login, keeping exported ports on containers. 
Fix Kubernetes installation with VPNkit subnet. 
Fix occasional crash when gathering diagnostics on windows due to process output not being redirected to stdout. 
Fix race where kubernetes would sometimes fail to start after the app is restarted. 
System tray icon now opens the menu with left or right mouse button. 
When displaying crash report Window, do not send bugsnag crash report unless the user asks for uploading diagnostics. 
Removed the ability to log in using your email address as a username. The docker command line does not support this. 
For LCOW the host must run Windows 10 Professional or Windows 10 Enterprise version 1809 or later. 
Disables the usages statistics checkbox in the Windows Docker Desktop on public preview channels as usage statistics cannot be disabled on these channels. 
Add a dialog box during start up when a shared drive fails to mount allowing the user to retry mounting the drive or remove it from the shared drive list. 
Fix Delete of persistent volume claims 
Truncate UDP DNS responses which are over 512 bytes in size 
Fix docker not added to PATH after install in some cases 
Fix port 8080 that was used on localhost when starting Kubernetes. 
Fix “create issue” link in diagnostics windows. 
Fix service log collection in diagnostics 
Gather /etc/hosts to help diagnostics 
Add 18.09 missing daemon options 
Rename Docker for Windows to Docker Desktop 
Partially open services ports if possibles 
Quit will not check if service is running anymore 
Fix UI lock when changing kubernetes state 
