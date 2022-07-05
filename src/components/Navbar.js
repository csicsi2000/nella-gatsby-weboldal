import React from "react";
import { Link } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
//import { TransitionPortal } from "gatsby-plugin-transition-link";
import { ThemeToggler } from "gatsby-plugin-dark-mode";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger() {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  }

  getDirection(target) {
    if (typeof window !== `undefined`) {
      let currentLocation = window.location.pathname;
      let pages = ["about", "blog", "contact"];

      let currentIndex = 0;
      let targetIndex = -1;

      for (let i = 0; i < pages.length; i++) {
        if (currentLocation.includes(pages[i])) {
          currentIndex = i;
        }
        if (target.includes(pages[i])) {
          targetIndex = i;
        }
      }

      if (currentIndex > targetIndex) {
        console.log("left");
        return "left";
      } else if (targetIndex > currentIndex) {
        console.log("right");

        return "right";
      } else {
        return "Top";
      }
    }
  }

  render() {
    return (
      //<TransitionPortal>
        <nav
          className="navbar is-transparent"
          role="navigation"
          aria-label="main-navigation"
          onWindowScroll="handleScroll()"
        >
          <div className="container">
            <div className="navbar-brand">
              {/* Hamburger menu */}
              <div
                className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                data-target="navMenu"
                role="menuitem"
                tabIndex={0}
                onKeyPress={() => this.toggleHamburger()}
                onClick={() => this.toggleHamburger()}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            <div
              id="navMenu"
              className={`navbar-menu ${this.state.navBarActiveClass}`}
            >
              <div className="navbar-start has-text-centered">
                <AniLink
                  cover
                  direction={this.getDirection("/")}
                  duration={0.3}
                  bg="var(--secondary)"
                  className="navbar-item"
                  to="/"
                >
                  Home
                </AniLink>
                <AniLink
                  cover
                  direction={this.getDirection("/about")}
                  duration={0.3}
                  bg="var(--secondary)"
                  className="navbar-item"
                  to="/about"
                >
                  About
                </AniLink>
                <AniLink
                  cover
                  direction={this.getDirection("/blog")}
                  duration={0.3}
                  bg="var(--secondary)"
                  className="navbar-item"
                  to="/blog"
                >
                  Blog
                </AniLink>
                <AniLink
                  cover
                  direction={this.getDirection("/contact")}
                  duration={0.3}
                  bg="var(--secondary)"
                  className="navbar-item"
                  to="/contact"
                >
                  Contact
                </AniLink>
                <Link className="navbar-item" to="/contact/examples">
                  Form Examples
                </Link>
              </div>
              <div className="navbar-end has-text-centered">
                <ThemeToggler>
                  {({ theme, toggleTheme }) => (
                    <div class="center-child">
                      <label class="switch">
                        <input
                          class="dark-toggle"
                          type="checkbox"
                          onChange={(e) =>
                            toggleTheme(e.target.checked ? "dark" : "light")
                          }
                          checked={theme === "dark"}
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  )}
                </ThemeToggler>
              </div>
            </div>
          </div>
        </nav>
      //</TransitionPortal>
    );
  }
};

export default Navbar;
