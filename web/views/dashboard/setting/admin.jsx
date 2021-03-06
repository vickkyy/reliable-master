/* ================================================================
 * reliable-master by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Mar 17 2015 00:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const React = require('react');

class Admin extends React.Component {

  render() {
    return (
      <div className="panel admin">
        <a target="_blank" href="/dashboard/mail" className="btn btn-warning pull-right">{this.props.gettext('page.global.send.email')}</a>
      </div>
    );
  }
}

module.exports = Admin;
