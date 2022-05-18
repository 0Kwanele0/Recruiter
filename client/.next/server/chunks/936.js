exports.id = 936;
exports.ids = [936];
exports.modules = {

/***/ 8162:
/***/ ((module) => {

// Exports
module.exports = {
	"footer": "footer_footer__z2Os4"
};


/***/ }),

/***/ 5235:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "nav_container__Kl72B",
	"pcNav": "nav_pcNav___VBYl",
	"links": "nav_links__YAWy5",
	"profile": "nav_profile__SCa_W",
	"miniNav": "nav_miniNav__4zxdd",
	"icon": "nav_icon__567xl",
	"mobileNav": "nav_mobileNav__cWjkc",
	"profileIcon": "nav_profileIcon__13dcT"
};


/***/ }),

/***/ 6446:
/***/ ((module) => {

// Exports
module.exports = {
	"body": "layout_body__a18c7"
};


/***/ }),

/***/ 5936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/styles/nav.module.scss
var nav_module = __webpack_require__(5235);
var nav_module_default = /*#__PURE__*/__webpack_require__.n(nav_module);
;// CONCATENATED MODULE: ./public/assets/icons/profileavatar.png
/* harmony default export */ const profileavatar = ({"src":"/_next/static/media/profileavatar.6a9c50d2.png","height":64,"width":64,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAVUlEQVR42iXIMQqAMBBE0YmteAXbKKgptNVmyWn0/uXHgeXBZxhREEG3QBQ5Mw+y20seVFZXbs2j8LLYR8kjaGzsbiBxcCHSSROdCTGYvLoIRkQaiR/mrkZYipevBgAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./public/assets/icons/logout.png
/* harmony default export */ const logout = ({"src":"/_next/static/media/logout.412bce9f.png","height":60,"width":60,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAVUlEQVR42mXNoQ2DUAAG4b+8hJrq2tq6DlDZsgIJFtAY2ISR2OsLiiCwl9xd3MTDT+MuSlRiNumt3hLxUkQ8rer42rQ6HzH6X8FVqcRiMhzRc1uLsgMhc0tqnzgO2wAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./public/assets/icons/settings.png
/* harmony default export */ const icons_settings = ({"src":"/_next/static/media/settings.b4d28c82.png","height":64,"width":64,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAZklEQVR42mNgYPjHxAAF/5igxD+Ffw1AqADm/WMEUm3/ZP5J/2tFCJT/EwEKVUP0sQBx1r9tQEG3f87/OEBCtv8agKTkv9n/Fv1rBgkE/pMFkj7/FvyL+LccZAYY/GP91/JvzT8LAAvINuQ2vbCvAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./public/assets/icons/closer.png
/* harmony default export */ const closer = ({"src":"/_next/static/media/closer.309c0374.png","height":50,"width":50,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAQElEQVR42mVNQQoAMAiSEaxjn9sftv/fZUaww0ISk0zQOAhNsSUtBiGE1Cix6ZziIJCnWo7gGSrDn9Ej/elfewFz3kUG1tv4OwAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./public/assets/icons/menu.png
/* harmony default export */ const icons_menu = ({"src":"/_next/static/media/menu.0e5e8a04.png","height":50,"width":50,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAK0lEQVR42mPAAP/M/4X88/8XAIT+QJY5FhWK/4z+6f8zAEJ9IEsRQ4AMQwF2Bicx6Cxt7QAAAABJRU5ErkJggg=="});
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/NavBar.jsx











function NavBar() {
    const { 0: logged , 1: setLogged  } = (0,external_react_.useState)(false);
    const { 0: mounted , 1: setMounted  } = (0,external_react_.useState)(false);
    const { 0: menu , 1: setMenu  } = (0,external_react_.useState)(false);
    const { 0: details , 1: setDetails  } = (0,external_react_.useState)();
    const { 0: themenu , 1: setThemenu  } = (0,external_react_.useState)(icons_menu);
    const { 0: mobileMenuOpened , 1: setMobileMenuOpened  } = (0,external_react_.useState)(false);
    const mobileMenu = (0,external_react_.useRef)(null);
    const router = (0,router_.useRouter)();
    function settings() {
        openMobileMenu();
        setMenu(!menu);
        if (details.user.type) {
            if (details.user.type == "Recruiter") {
                router.push(`/recruiterprofile`);
                return;
            } else {
                router.push(`/developerprofile`);
                return;
            }
        } else {}
    }
    function logOut() {
        localStorage.removeItem("recruiter-x-auth-token");
        openMobileMenu();
        router.reload();
        setMenu(!menu);
    }
    function showMenu() {
        setMenu(!menu);
    }
    function openMobileMenu() {
        if (mobileMenuOpened) {
            mobileMenu.current.style.display = "none";
            setMobileMenuOpened(false);
            setThemenu(icons_menu);
        } else {
            mobileMenu.current.style.display = "flex";
            setThemenu(closer);
            setMobileMenuOpened(true);
        }
    }
    function goHome() {
        mobileMenu.current.style.display = "none";
        setMobileMenuOpened(false);
        setThemenu(icons_menu);
        router.push("/");
    }
    (0,external_react_.useEffect)(()=>{
        const token = localStorage.getItem("recruiter-x-auth-token");
        const parsed = JSON.parse(token);
        if (token) {
            setDetails(parsed);
            setLogged(true);
            setMounted(true);
        } else {
            setMounted(true);
            setLogged(false);
        }
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (nav_module_default()).container,
        children: mounted && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (nav_module_default()).pcNav,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: "assets/logo.png",
                                alt: "Recruiter"
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (nav_module_default()).links,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/devs",
                                    children: "Find Developers"
                                }),
                                !logged ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/login",
                                            children: "Login"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/register",
                                            children: "Register"
                                        }),
                                        " "
                                    ]
                                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (nav_module_default()).profile,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            onClick: showMenu,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                src: profileavatar,
                                                alt: "Profile",
                                                width: 30,
                                                height: 30
                                            })
                                        }),
                                        menu && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (nav_module_default()).miniNav,
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    onClick: settings,
                                                    className: (nav_module_default()).icon,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                            src: icons_settings,
                                                            alt: "setting",
                                                            width: 25,
                                                            height: 25
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            children: "Settings"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    onClick: logOut,
                                                    className: (nav_module_default()).icon,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                            src: logout,
                                                            alt: "setting",
                                                            width: 25,
                                                            height: 25
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            children: "Logout"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (nav_module_default()).mobileNav,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            onClick: goHome,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: "assets/logo.png",
                                alt: "Recruiter"
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (nav_module_default()).right,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    onClick: openMobileMenu,
                                    className: (nav_module_default()).humburger,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        src: themenu,
                                        alt: "menu",
                                        width: 30,
                                        height: 30
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    ref: mobileMenu,
                                    className: (nav_module_default()).links,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            onClick: ()=>{
                                                router.push("/devs");
                                                openMobileMenu();
                                            },
                                            children: "Find Developers"
                                        }),
                                        !logged ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    onClick: ()=>{
                                                        router.push("/login");
                                                        openMobileMenu();
                                                    },
                                                    children: "Login"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    onClick: ()=>{
                                                        router.push("/register");
                                                        openMobileMenu();
                                                    },
                                                    children: "Register"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (nav_module_default()).miniNav,
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    onClick: settings,
                                                    className: (nav_module_default()).icon,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                            src: icons_settings,
                                                            alt: "setting",
                                                            width: 25,
                                                            height: 25
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            children: "Profile"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    onClick: logOut,
                                                    className: (nav_module_default()).icon,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                            src: logout,
                                                            alt: "setting",
                                                            width: 25,
                                                            height: 25
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            children: "Logout"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const components_NavBar = (NavBar);

// EXTERNAL MODULE: ./components/styles/footer.module.scss
var footer_module = __webpack_require__(8162);
var footer_module_default = /*#__PURE__*/__webpack_require__.n(footer_module);
;// CONCATENATED MODULE: ./components/Footer.jsx


function Footer() {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (footer_module_default()).footer,
        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
            children: "Recruiter \xa9 2022"
        })
    });
}
/* harmony default export */ const components_Footer = (Footer);

// EXTERNAL MODULE: ./styles/layout.module.scss
var layout_module = __webpack_require__(6446);
var layout_module_default = /*#__PURE__*/__webpack_require__.n(layout_module);
;// CONCATENATED MODULE: ./pages/layout.js




function Layout({ children  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components_NavBar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: (layout_module_default()).body,
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
        ]
    });
};


/***/ })

};
;