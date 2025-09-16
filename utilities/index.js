// utilities/index.js
const Util = {}

Util.getNav = function () {
  return `
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/account/login">Login</a></li>
        <li><a href="/account/register">Register</a></li>
      </ul>
    </nav>
  `;
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
