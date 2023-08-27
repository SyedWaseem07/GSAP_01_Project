const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let timeLine = gsap.timeline();

function number(){
    let a = 0;
    setInterval(function(){
        if(a < 100) {
            a += Math.floor(Math.random()*15);
            if(a>100) {
                document.querySelector("#loader h4")[1].innerHTML = "100%"
            } else{
                document.querySelectorAll("#loader h4")[1].innerHTML = a+"%"
            }
        } else{
            document.querySelector("#loader h4")[1].innerHTML = "100%"
        }
    },100)
}
timeLine.to("#loader h4", {
    duration:1.5,
    onStart:number()
})
timeLine.to("#loader",{
    top:"-100vh",
    delay: 0.5,
    duration: 1
})

function firstPageAnimation(){
    
    timeLine.from("#nav",{
        y: -10,
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingElem",{
        y:0,
        ease: Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger: 0.2
    })
    .from("#page1-footer",{
        y:-10,
        opacity: 0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
}
firstPageAnimation();

let timeOut; 

function mouseFollowerChaptaKaro(){
    let xscale = 1;
    let yscale = 1;
    
    let xprev = 0;
    let yprev = 0;
    window.addEventListener('mousemove', function(dets){
        clearTimeout(timeOut);
        
        let xdiff = dets.clientX - xprev;
        xprev = dets.clientX;

        let ydiff =  dets.clientY - yprev;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

        mouseFollower(xscale, yscale);
        timeOut = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

mouseFollowerChaptaKaro();
function mouseFollower(xscale, yscale){
    window.addEventListener('mousemove', function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

document.querySelectorAll('.elem')
.forEach(function(elem){
    let rotate = 0;
    let diff = 0;

    elem.addEventListener('mouseleave', function(dets){
        elem.querySelector('img').style.opacity="0"
        elem.querySelector('img').style.display="none"
        
        gsap.to(elem.querySelector('.elem h1'),{
            opacity:0.65,
            translateX: "0"
        })
        gsap.to(elem.querySelector('.elem h4'),{
            opacity: 0.65
        })
        gsap.to(elem.querySelector('img'), {
            opacity: 0,
            display: "none",
            ease: Power3,
            duration: 0.5
        })
        document.querySelector("#minicircle").style.width = "10px"
        document.querySelector("#minicircle").style.height = "10px"
        document.querySelector("#minicircle").textContent = ""
        document.querySelector("#minicircle").style.opacity = "1"
    })



    elem.addEventListener('mousemove', function(dets){
        let topDiff = dets.clientY - elem.getBoundingClientRect().top;
        diff = dets.clientX - rotate;
        rotate = dets.clientX;
        
        document.querySelector("#minicircle").style.width ="70px"
        document.querySelector("#minicircle").style.height ="70px"
        document.querySelector("#minicircle").style.borderRadius = "50%"
        document.querySelector("#minicircle").textContent = "view"
        document.querySelector("#minicircle").style.color = "black"
        document.querySelector("#minicircle").style.opacity = "0.7"
        document.querySelector("#minicircle").style.display = "flex"
        document.querySelector("#minicircle").style.alignItems = "center"
        document.querySelector("#minicircle").style.justifyContent = "center"

        
        gsap.to(elem.querySelector('.elem h1'),{
            opacity: 0.2,
            translateX: "50px",
            ease: Power3
        })
        gsap.to(elem.querySelector('.elem h4'),{
            opacity: 0.2,
        })
        gsap.to(elem.querySelector('img'), {
            opacity:1,
            display: "inline",
            ease: Power3,
            top: topDiff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diff)
        })
        
        
    })
})
document.querySelector("#minicircle").style.width = "10px"
        document.querySelector("#minicircle").style.height = "10px"
        document.querySelector("#minicircle").textContent = ""
        document.querySelector("#minicircle").style.opacity = "1"