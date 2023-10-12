
//sticky navbar

// window.addEventListener('scroll', function () {
//     var navbar = document.querySelector('#nav');
//     var scrollY = window.scrollY;

//     console.log(window.scrollY);

//     if (scrollY > 0) {
//         navbar.classList.add('sticky');
//     } else {
//         navbar.classList.remove('sticky');
//     }
// });



//smooth scrolling

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



//Animate hero section

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            duration: 2,
            ease: Expo.easeInOut,
            delay: -1,
            stagger: .2
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut,
        })
}


//Change the circle shape while moving

var timeout;

function circleSkewMaker() {

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;


    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100)
    })
}


//Circle follows the cursor as it is moving

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}



//Animate image moving with mouse cursor

function imageMouseFollower() {
    document.querySelectorAll(".elem").forEach(function (elem) {

        var rotate = 0;
        var diffrot = 0;
        var hideTimeout;

        elem.addEventListener("mousemove", function (dets) {

            clearTimeout(hideTimeout);


            var diff = dets.clientY - elem.getBoundingClientRect().top;

            diffrot = dets.clientX - rotate;
            rotate = dets.clientX;

            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power3,
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20, 20, diffrot)
            })

            gsap.to(elem.querySelector(".anim"), {
                opacity: .2,
                ease: Power2,
                duration: 0.3,
                paddingLeft: 30
            })
        })



        elem.addEventListener("mouseleave", function (dets) {

            hideTimeout = setTimeout(function () {
                gsap.to(elem.querySelector("img"), {
                    opacity: 0,
                    ease: Power3,
                    duration: 0.5
                })

                gsap.to(elem.querySelector(".anim"), {
                    opacity: .7,
                    paddingLeft: 0,
                    ease: Power2,
                })
            }, 300);
        })

    })
}



//disable animation for mobile screen

if (window.innerWidth > 600) {
    imageMouseFollower();
    circleSkewMaker();
    circleMouseFollower();
}


firstPageAnim();