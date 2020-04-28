document.getElementsByTagName("video")[0].loop = true;
document.getElementsByTagName("video")[0]
.play()
.then(() => console.log("replaying"))
.catch(err => console.log("error cannot replay:", err))
