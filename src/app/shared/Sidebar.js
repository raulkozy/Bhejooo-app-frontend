import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/orders', state: 'orderMenuOpen'},
      { path: '/kyc', state: 'kycMenuOpen'},
      { path: '/finances', state: 'pricing'},
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href=""><img src={require('../../assets/images/LogoWhite.png')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="!#" onClick={evt => evt.preventDefault()}><img src={require('../../assets/images/Blogo.png')} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../../assets/images/faces/face15.jpg')} alt="profile" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">{sessionStorage.getItem('username')}</h5>
                  <span><Trans>Gold Member</Trans></span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="/user-pages/login-1" className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small" >Logout</p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navigation</Trans></span>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/orders') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.orderMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('orderMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-package-variant-closed"></i>
              </span>
              <span className="menu-title"><Trans>Orders</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.orderMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/orders/manage-order') ? 'nav-link active' : 'nav-link'} to="/orders/manage-order"><Trans>Manage Orders</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/orders/create-order') ? 'nav-link active' : 'nav-link'} to="/orders/create-order"><Trans>Create Orders</Trans></Link></li>
                  {/* <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li> */}
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/kyc') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/kyc">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>KYC</Trans></span>
            </Link>
          </li>
          {/* <li className={this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('basicUiMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.basicUiMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          <li className={this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.shipments ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('shipments')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-bike"></i>
              </span>
              <span className="menu-title"><Trans>Shipments</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.shipments}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} ><Trans>Track</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} ><Trans>NDR</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} ><Trans>RTO</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.weightDiscrepancy ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('weightDiscrepancy')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-weight"></i>
              </span>
              <span className="menu-title"><Trans>Weight Discrepancy</Trans></span>
              {/* <i className="menu-arrow"></i> */}
            </div>
          </li>
          {/* <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.productCategory ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('productCategory')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-chart-pie"></i>
              </span>
              <span className="menu-title"><Trans>Product Category</Trans></span>
            </div>
          </li> */}
          <li className={this.isPathActive('/finances') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.pricing ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('pricing')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-currency-inr"></i>
              </span>
              <span className="menu-title"><Trans>Finances</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.pricing}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/finances/buttons') ? 'nav-link active' : 'nav-link'} ><Trans>Shipping Charges</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/finances/calculator') ? 'nav-link active' : 'nav-link'} to="/finances/calculator"><Trans>Shipping Rate Calculator</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/finances/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Credit History</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/finances/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Payment History</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/finances/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Wallet Recharge History</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/finances/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Invoice</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.tools ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('tools')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-tooltip-edit"></i>
              </span>
              <span className="menu-title"><Trans>Tools</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.tools}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} ><Trans>Courier Partner Priority</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} ><Trans>Shipping Label Customization</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Servicable Pincode List</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Report</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Notifications</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.settings ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('settings')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-settings"></i>
              </span>
              <span className="menu-title"><Trans>Settings</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.settings}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} ><Trans>API Integration</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} ><Trans>User Role Management</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} ><Trans>Channel Integration</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          {/* ///////////////////////////////// */}
          {/* <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('formElementsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Form Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          {/* ///////////////////////////////// */}
          {/* <li className={this.isPathActive('/tables') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('tablesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title"><Trans>Tables</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link'} to="/tables/basic-table"><Trans>Basic Table</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          {/* <li className={this.isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title"><Trans>Charts</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'} to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          {/* ///////////////////////////////////////// */}
          {/* <li className={this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title"><Trans>Icons</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi"><Trans>Material</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          {/* ///////////////////////////////////// */}
          {/* <li className={this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>More</Trans></span>
          </li>
          {/* <li className={this.isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('errorPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.errorPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title"><Trans>Documentation</Trans></span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);