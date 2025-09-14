import { C as It, V as x, M as z, T as H, Q as pt, S as ut, a as D, R as Ht, P as zt, b as Nt, c as Ut, d as N, e as Ft, W as Bt, A as Yt, D as Vt, f as Kt, g as Zt, G as Ct, h as Wt, i as ft, j as mt, k as W, l as Xt, L as Gt, F as qt, m as $t, B as gt, n as I, o as q, p as _t, q as U, r as Qt, s as bt, t as $, u as Jt, v as Tt } from "./three-xPsQEuOQ.js";
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const n of i) if (n.type === "childList") for (const a of n.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
  }).observe(document, { childList: true, subtree: true });
  function e(i) {
    const n = {};
    return i.integrity && (n.integrity = i.integrity), i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? n.credentials = "include" : i.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
  }
  function s(i) {
    if (i.ep) return;
    i.ep = true;
    const n = e(i);
    fetch(i.href, n);
  }
})();
const yt = { type: "change" }, ct = { type: "start" }, jt = { type: "end" }, F = new Ht(), vt = new zt(), te = Math.cos(70 * Nt.DEG2RAD), L = new x(), S = 2 * Math.PI, y = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 }, Q = 1e-6;
class ee extends It {
  constructor(t, e = null) {
    super(t, e), this.state = y.NONE, this.target = new x(), this.cursor = new x(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = false, this.dampingFactor = 0.05, this.enableZoom = true, this.zoomSpeed = 1, this.enableRotate = true, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = true, this.panSpeed = 1, this.screenSpacePanning = true, this.keyPanSpeed = 7, this.zoomToCursor = false, this.autoRotate = false, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: z.ROTATE, MIDDLE: z.DOLLY, RIGHT: z.PAN }, this.touches = { ONE: H.ROTATE, TWO: H.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new x(), this._lastQuaternion = new pt(), this._lastTargetPosition = new x(), this._quat = new pt().setFromUnitVectors(t.up, new x(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ut(), this._sphericalDelta = new ut(), this._scale = 1, this._panOffset = new x(), this._rotateStart = new D(), this._rotateEnd = new D(), this._rotateDelta = new D(), this._panStart = new D(), this._panEnd = new D(), this._panDelta = new D(), this._dollyStart = new D(), this._dollyEnd = new D(), this._dollyDelta = new D(), this._dollyDirection = new x(), this._mouse = new D(), this._performCursorZoom = false, this._pointers = [], this._pointerPositions = {}, this._controlActive = false, this._onPointerMove = se.bind(this), this._onPointerDown = ie.bind(this), this._onPointerUp = ne.bind(this), this._onContextMenu = de.bind(this), this._onMouseWheel = re.bind(this), this._onKeyDown = le.bind(this), this._onTouchStart = ce.bind(this), this._onTouchMove = he.bind(this), this._onMouseDown = oe.bind(this), this._onMouseMove = ae.bind(this), this._interceptControlDown = pe.bind(this), this._interceptControlUp = ue.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  connect(t) {
    super.connect(t), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: true, capture: true }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: true }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(yt), this.update(), this.state = y.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    L.copy(e).sub(this.target), L.applyQuaternion(this._quat), this._spherical.setFromVector3(L), this.autoRotate && this.state === y.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let s = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(s) && isFinite(i) && (s < -Math.PI ? s += S : s > Math.PI && (s -= S), i < -Math.PI ? i += S : i > Math.PI && (i -= S), s <= i ? this._spherical.theta = Math.max(s, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (s + i) / 2 ? Math.max(s, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === true ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let n = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), n = a != this._spherical.radius;
    }
    if (L.setFromSpherical(this._spherical), L.applyQuaternion(this._quatInverse), e.copy(this.target).add(L), this.object.lookAt(this.target), this.enableDamping === true ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const c = L.length();
        a = this._clampDistance(c * this._scale);
        const l = c - a;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), n = !!l;
      } else if (this.object.isOrthographicCamera) {
        const c = new x(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), n = l !== this.object.zoom;
        const r = new x(this._mouse.x, this._mouse.y, 0);
        r.unproject(this.object), this.object.position.sub(r).add(c), this.object.updateMatrixWorld(), a = L.length();
      } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = false;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (F.origin.copy(this.object.position), F.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(F.direction)) < te ? this.object.lookAt(this.target) : (vt.setFromNormalAndCoplanarPoint(this.object.up, this.target), F.intersectPlane(vt, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), n = true);
    }
    return this._scale = 1, this._performCursorZoom = false, n || this._lastPosition.distanceToSquared(this.object.position) > Q || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Q || this._lastTargetPosition.distanceToSquared(this.target) > Q ? (this.dispatchEvent(yt), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), true) : false;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? S / 60 * this.autoRotateSpeed * t : S / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * e);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, e) {
    L.setFromMatrixColumn(e, 0), L.multiplyScalar(-t), this._panOffset.add(L);
  }
  _panUp(t, e) {
    this.screenSpacePanning === true ? L.setFromMatrixColumn(e, 1) : (L.setFromMatrixColumn(e, 0), L.crossVectors(this.object.up, L)), L.multiplyScalar(t), this._panOffset.add(L);
  }
  _pan(t, e) {
    const s = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      L.copy(i).sub(this.target);
      let n = L.length();
      n *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * n / s.clientHeight, this.object.matrix), this._panUp(2 * e * n / s.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / s.clientWidth, this.object.matrix), this._panUp(e * (this.object.top - this.object.bottom) / this.object.zoom / s.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = false);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = false);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = false);
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = true;
    const s = this.domElement.getBoundingClientRect(), i = t - s.left, n = e - s.top, a = s.width, c = s.height;
    this._mouse.x = i / a * 2 - 1, this._mouse.y = -(n / c) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(S * this._rotateDelta.x / e.clientHeight), this._rotateUp(S * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let e = false;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(S * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), e = true;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(-S * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), e = true;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(S * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), e = true;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(-S * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), e = true;
        break;
    }
    e && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1) this._rotateStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), s = 0.5 * (t.pageX + e.x), i = 0.5 * (t.pageY + e.y);
      this._rotateStart.set(s, i);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1) this._panStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), s = 0.5 * (t.pageX + e.x), i = 0.5 * (t.pageY + e.y);
      this._panStart.set(s, i);
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t), s = t.pageX - e.x, i = t.pageY - e.y, n = Math.sqrt(s * s + i * i);
    this._dollyStart.set(0, n);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1) this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const s = this._getSecondPointerPosition(t), i = 0.5 * (t.pageX + s.x), n = 0.5 * (t.pageY + s.y);
      this._rotateEnd.set(i, n);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(S * this._rotateDelta.x / e.clientHeight), this._rotateUp(S * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1) this._panEnd.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), s = 0.5 * (t.pageX + e.x), i = 0.5 * (t.pageY + e.y);
      this._panEnd.set(s, i);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t), s = t.pageX - e.x, i = t.pageY - e.y, n = Math.sqrt(s * s + i * i);
    this._dollyEnd.set(0, n), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const a = (t.pageX + e.x) * 0.5, c = (t.pageY + e.y) * 0.5;
    this._updateZoomParameters(a, c);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let e = 0; e < this._pointers.length; e++) if (this._pointers[e] == t.pointerId) {
      this._pointers.splice(e, 1);
      return;
    }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++) if (this._pointers[e] == t.pointerId) return true;
    return false;
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId];
    e === void 0 && (e = new D(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const e = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[e];
  }
  _customWheelEvent(t) {
    const e = t.deltaMode, s = { clientX: t.clientX, clientY: t.clientY, deltaY: t.deltaY };
    switch (e) {
      case 1:
        s.deltaY *= 16;
        break;
      case 2:
        s.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (s.deltaY *= 10), s;
  }
}
function ie(o) {
  this.enabled !== false && (this._pointers.length === 0 && (this.domElement.setPointerCapture(o.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(o) && (this._addPointer(o), o.pointerType === "touch" ? this._onTouchStart(o) : this._onMouseDown(o)));
}
function se(o) {
  this.enabled !== false && (o.pointerType === "touch" ? this._onTouchMove(o) : this._onMouseMove(o));
}
function ne(o) {
  switch (this._removePointer(o), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(o.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(jt), this.state = y.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function oe(o) {
  let t;
  switch (o.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case z.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(o), this.state = y.DOLLY;
      break;
    case z.ROTATE:
      if (o.ctrlKey || o.metaKey || o.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(o), this.state = y.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(o), this.state = y.ROTATE;
      }
      break;
    case z.PAN:
      if (o.ctrlKey || o.metaKey || o.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(o), this.state = y.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(o), this.state = y.PAN;
      }
      break;
    default:
      this.state = y.NONE;
  }
  this.state !== y.NONE && this.dispatchEvent(ct);
}
function ae(o) {
  switch (this.state) {
    case y.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(o);
      break;
    case y.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(o);
      break;
    case y.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(o);
      break;
  }
}
function re(o) {
  this.enabled === false || this.enableZoom === false || this.state !== y.NONE || (o.preventDefault(), this.dispatchEvent(ct), this._handleMouseWheel(this._customWheelEvent(o)), this.dispatchEvent(jt));
}
function le(o) {
  this.enabled !== false && this._handleKeyDown(o);
}
function ce(o) {
  switch (this._trackPointer(o), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case H.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(o), this.state = y.TOUCH_ROTATE;
          break;
        case H.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(o), this.state = y.TOUCH_PAN;
          break;
        default:
          this.state = y.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case H.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(o), this.state = y.TOUCH_DOLLY_PAN;
          break;
        case H.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(o), this.state = y.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = y.NONE;
      }
      break;
    default:
      this.state = y.NONE;
  }
  this.state !== y.NONE && this.dispatchEvent(ct);
}
function he(o) {
  switch (this._trackPointer(o), this.state) {
    case y.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(o), this.update();
      break;
    case y.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(o), this.update();
      break;
    case y.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(o), this.update();
      break;
    case y.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(o), this.update();
      break;
    default:
      this.state = y.NONE;
  }
}
function de(o) {
  this.enabled !== false && o.preventDefault();
}
function pe(o) {
  o.key === "Control" && (this._controlActive = true, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
function ue(o) {
  o.key === "Control" && (this._controlActive = false, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
function fe() {
  const o = new Ut();
  o.background = new N(15790320);
  const t = new Ft(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
  t.position.set(0, 0, 250);
  const e = new Bt({ antialias: true });
  e.setSize(window.innerWidth, window.innerHeight), document.body.prepend(e.domElement);
  const s = new ee(t, e.domElement);
  s.enablePan = true, s.target.set(0, 0, 0), s.update();
  const i = new Yt(16777215, 0.8);
  o.add(i);
  const n = new Vt(16777215, 1);
  n.position.set(1, 1, 1), o.add(n);
  const a = document.createElement("canvas");
  a.width = 1024, a.height = 1024;
  const c = a.getContext("2d"), l = new Kt(a), r = new Zt({ map: l }), h = new Ct(), d = new Wt(2, 32), p = new ft({ color: 31487, transparent: true, opacity: 0.5, side: mt, depthWrite: false }), u = new W(d, p), f = new ft({ color: 13158, transparent: true, opacity: 0.25, side: mt, depthFunc: Xt }), g = new W(d, f);
  return h.add(u), h.add(g), h.visible = false, o.add(h), window.addEventListener("resize", () => {
    t.aspect = window.innerWidth / window.innerHeight, t.updateProjectionMatrix(), e.setSize(window.innerWidth, window.innerHeight);
  }), { scene: o, camera: t, renderer: e, controls: s, skinMaterial: r, textureContext: c, texture: l, pivotHelper: h };
}
const me = /^[og]\s*(.+)?/, ge = /^mtllib /, _e = /^usemtl /, be = /^usemap /, wt = /\s+/, kt = new x(), J = new x(), Et = new x(), Lt = new x(), T = new x(), B = new N();
function ye() {
  const o = { objects: [], object: {}, vertices: [], normals: [], colors: [], uvs: [], materials: {}, materialLibraries: [], startObject: function(t, e) {
    if (this.object && this.object.fromDeclaration === false) {
      this.object.name = t, this.object.fromDeclaration = e !== false;
      return;
    }
    const s = this.object && typeof this.object.currentMaterial == "function" ? this.object.currentMaterial() : void 0;
    if (this.object && typeof this.object._finalize == "function" && this.object._finalize(true), this.object = { name: t || "", fromDeclaration: e !== false, geometry: { vertices: [], normals: [], colors: [], uvs: [], hasUVIndices: false }, materials: [], smooth: true, startMaterial: function(i, n) {
      const a = this._finalize(false);
      a && (a.inherited || a.groupCount <= 0) && this.materials.splice(a.index, 1);
      const c = { index: this.materials.length, name: i || "", mtllib: Array.isArray(n) && n.length > 0 ? n[n.length - 1] : "", smooth: a !== void 0 ? a.smooth : this.smooth, groupStart: a !== void 0 ? a.groupEnd : 0, groupEnd: -1, groupCount: -1, inherited: false, clone: function(l) {
        const r = { index: typeof l == "number" ? l : this.index, name: this.name, mtllib: this.mtllib, smooth: this.smooth, groupStart: 0, groupEnd: -1, groupCount: -1, inherited: false };
        return r.clone = this.clone.bind(r), r;
      } };
      return this.materials.push(c), c;
    }, currentMaterial: function() {
      if (this.materials.length > 0) return this.materials[this.materials.length - 1];
    }, _finalize: function(i) {
      const n = this.currentMaterial();
      if (n && n.groupEnd === -1 && (n.groupEnd = this.geometry.vertices.length / 3, n.groupCount = n.groupEnd - n.groupStart, n.inherited = false), i && this.materials.length > 1) for (let a = this.materials.length - 1; a >= 0; a--) this.materials[a].groupCount <= 0 && this.materials.splice(a, 1);
      return i && this.materials.length === 0 && this.materials.push({ name: "", smooth: this.smooth }), n;
    } }, s && s.name && typeof s.clone == "function") {
      const i = s.clone(0);
      i.inherited = true, this.object.materials.push(i);
    }
    this.objects.push(this.object);
  }, finalize: function() {
    this.object && typeof this.object._finalize == "function" && this.object._finalize(true);
  }, parseVertexIndex: function(t, e) {
    const s = parseInt(t, 10);
    return (s >= 0 ? s - 1 : s + e / 3) * 3;
  }, parseNormalIndex: function(t, e) {
    const s = parseInt(t, 10);
    return (s >= 0 ? s - 1 : s + e / 3) * 3;
  }, parseUVIndex: function(t, e) {
    const s = parseInt(t, 10);
    return (s >= 0 ? s - 1 : s + e / 2) * 2;
  }, addVertex: function(t, e, s) {
    const i = this.vertices, n = this.object.geometry.vertices;
    n.push(i[t + 0], i[t + 1], i[t + 2]), n.push(i[e + 0], i[e + 1], i[e + 2]), n.push(i[s + 0], i[s + 1], i[s + 2]);
  }, addVertexPoint: function(t) {
    const e = this.vertices;
    this.object.geometry.vertices.push(e[t + 0], e[t + 1], e[t + 2]);
  }, addVertexLine: function(t) {
    const e = this.vertices;
    this.object.geometry.vertices.push(e[t + 0], e[t + 1], e[t + 2]);
  }, addNormal: function(t, e, s) {
    const i = this.normals, n = this.object.geometry.normals;
    n.push(i[t + 0], i[t + 1], i[t + 2]), n.push(i[e + 0], i[e + 1], i[e + 2]), n.push(i[s + 0], i[s + 1], i[s + 2]);
  }, addFaceNormal: function(t, e, s) {
    const i = this.vertices, n = this.object.geometry.normals;
    kt.fromArray(i, t), J.fromArray(i, e), Et.fromArray(i, s), T.subVectors(Et, J), Lt.subVectors(kt, J), T.cross(Lt), T.normalize(), n.push(T.x, T.y, T.z), n.push(T.x, T.y, T.z), n.push(T.x, T.y, T.z);
  }, addColor: function(t, e, s) {
    const i = this.colors, n = this.object.geometry.colors;
    i[t] !== void 0 && n.push(i[t + 0], i[t + 1], i[t + 2]), i[e] !== void 0 && n.push(i[e + 0], i[e + 1], i[e + 2]), i[s] !== void 0 && n.push(i[s + 0], i[s + 1], i[s + 2]);
  }, addUV: function(t, e, s) {
    const i = this.uvs, n = this.object.geometry.uvs;
    n.push(i[t + 0], i[t + 1]), n.push(i[e + 0], i[e + 1]), n.push(i[s + 0], i[s + 1]);
  }, addDefaultUV: function() {
    const t = this.object.geometry.uvs;
    t.push(0, 0), t.push(0, 0), t.push(0, 0);
  }, addUVLine: function(t) {
    const e = this.uvs;
    this.object.geometry.uvs.push(e[t + 0], e[t + 1]);
  }, addFace: function(t, e, s, i, n, a, c, l, r) {
    const h = this.vertices.length;
    let d = this.parseVertexIndex(t, h), p = this.parseVertexIndex(e, h), u = this.parseVertexIndex(s, h);
    if (this.addVertex(d, p, u), this.addColor(d, p, u), c !== void 0 && c !== "") {
      const f = this.normals.length;
      d = this.parseNormalIndex(c, f), p = this.parseNormalIndex(l, f), u = this.parseNormalIndex(r, f), this.addNormal(d, p, u);
    } else this.addFaceNormal(d, p, u);
    if (i !== void 0 && i !== "") {
      const f = this.uvs.length;
      d = this.parseUVIndex(i, f), p = this.parseUVIndex(n, f), u = this.parseUVIndex(a, f), this.addUV(d, p, u), this.object.geometry.hasUVIndices = true;
    } else this.addDefaultUV();
  }, addPointGeometry: function(t) {
    this.object.geometry.type = "Points";
    const e = this.vertices.length;
    for (let s = 0, i = t.length; s < i; s++) {
      const n = this.parseVertexIndex(t[s], e);
      this.addVertexPoint(n), this.addColor(n);
    }
  }, addLineGeometry: function(t, e) {
    this.object.geometry.type = "Line";
    const s = this.vertices.length, i = this.uvs.length;
    for (let n = 0, a = t.length; n < a; n++) this.addVertexLine(this.parseVertexIndex(t[n], s));
    for (let n = 0, a = e.length; n < a; n++) this.addUVLine(this.parseUVIndex(e[n], i));
  } };
  return o.startObject("", false), o;
}
class ve extends Gt {
  constructor(t) {
    super(t), this.materials = null;
  }
  load(t, e, s, i) {
    const n = this, a = new qt(this.manager);
    a.setPath(this.path), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(t, function(c) {
      try {
        e(n.parse(c));
      } catch (l) {
        i ? i(l) : console.error(l), n.manager.itemError(t);
      }
    }, s, i);
  }
  setMaterials(t) {
    return this.materials = t, this;
  }
  parse(t) {
    const e = new ye();
    t.indexOf(`\r
`) !== -1 && (t = t.replace(/\r\n/g, `
`)), t.indexOf(`\\
`) !== -1 && (t = t.replace(/\\\n/g, ""));
    const s = t.split(`
`);
    let i = [];
    for (let c = 0, l = s.length; c < l; c++) {
      const r = s[c].trimStart();
      if (r.length === 0) continue;
      const h = r.charAt(0);
      if (h !== "#") if (h === "v") {
        const d = r.split(wt);
        switch (d[0]) {
          case "v":
            e.vertices.push(parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3])), d.length >= 7 ? (B.setRGB(parseFloat(d[4]), parseFloat(d[5]), parseFloat(d[6]), $t), e.colors.push(B.r, B.g, B.b)) : e.colors.push(void 0, void 0, void 0);
            break;
          case "vn":
            e.normals.push(parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]));
            break;
          case "vt":
            e.uvs.push(parseFloat(d[1]), parseFloat(d[2]));
            break;
        }
      } else if (h === "f") {
        const p = r.slice(1).trim().split(wt), u = [];
        for (let g = 0, m = p.length; g < m; g++) {
          const v = p[g];
          if (v.length > 0) {
            const b = v.split("/");
            u.push(b);
          }
        }
        const f = u[0];
        for (let g = 1, m = u.length - 1; g < m; g++) {
          const v = u[g], b = u[g + 1];
          e.addFace(f[0], v[0], b[0], f[1], v[1], b[1], f[2], v[2], b[2]);
        }
      } else if (h === "l") {
        const d = r.substring(1).trim().split(" ");
        let p = [];
        const u = [];
        if (r.indexOf("/") === -1) p = d;
        else for (let f = 0, g = d.length; f < g; f++) {
          const m = d[f].split("/");
          m[0] !== "" && p.push(m[0]), m[1] !== "" && u.push(m[1]);
        }
        e.addLineGeometry(p, u);
      } else if (h === "p") {
        const p = r.slice(1).trim().split(" ");
        e.addPointGeometry(p);
      } else if ((i = me.exec(r)) !== null) {
        const d = (" " + i[0].slice(1).trim()).slice(1);
        e.startObject(d);
      } else if (_e.test(r)) e.object.startMaterial(r.substring(7).trim(), e.materialLibraries);
      else if (ge.test(r)) e.materialLibraries.push(r.substring(7).trim());
      else if (be.test(r)) console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
      else if (h === "s") {
        if (i = r.split(" "), i.length > 1) {
          const p = i[1].trim().toLowerCase();
          e.object.smooth = p !== "0" && p !== "off";
        } else e.object.smooth = true;
        const d = e.object.currentMaterial();
        d && (d.smooth = e.object.smooth);
      } else {
        if (r === "\0") continue;
        console.warn('THREE.OBJLoader: Unexpected line: "' + r + '"');
      }
    }
    e.finalize();
    const n = new Ct();
    if (n.materialLibraries = [].concat(e.materialLibraries), !(e.objects.length === 1 && e.objects[0].geometry.vertices.length === 0) === true) for (let c = 0, l = e.objects.length; c < l; c++) {
      const r = e.objects[c], h = r.geometry, d = r.materials, p = h.type === "Line", u = h.type === "Points";
      let f = false;
      if (h.vertices.length === 0) continue;
      const g = new gt();
      g.setAttribute("position", new I(h.vertices, 3)), h.normals.length > 0 && g.setAttribute("normal", new I(h.normals, 3)), h.colors.length > 0 && (f = true, g.setAttribute("color", new I(h.colors, 3))), h.hasUVIndices === true && g.setAttribute("uv", new I(h.uvs, 2));
      const m = [];
      for (let b = 0, R = d.length; b < R; b++) {
        const M = d[b], A = M.name + "_" + M.smooth + "_" + f;
        let w = e.materials[A];
        if (this.materials !== null) {
          if (w = this.materials.create(M.name), p && w && !(w instanceof q)) {
            const C = new q();
            _t.prototype.copy.call(C, w), C.color.copy(w.color), w = C;
          } else if (u && w && !(w instanceof U)) {
            const C = new U({ size: 10, sizeAttenuation: false });
            _t.prototype.copy.call(C, w), C.color.copy(w.color), C.map = w.map, w = C;
          }
        }
        w === void 0 && (p ? w = new q() : u ? w = new U({ size: 1, sizeAttenuation: false }) : w = new Qt(), w.name = M.name, w.flatShading = !M.smooth, w.vertexColors = f, e.materials[A] = w), m.push(w);
      }
      let v;
      if (m.length > 1) {
        for (let b = 0, R = d.length; b < R; b++) {
          const M = d[b];
          g.addGroup(M.groupStart, M.groupCount, b);
        }
        p ? v = new bt(g, m) : u ? v = new $(g, m) : v = new W(g, m);
      } else p ? v = new bt(g, m[0]) : u ? v = new $(g, m[0]) : v = new W(g, m[0]);
      v.name = r.name, n.add(v);
    }
    else if (e.vertices.length > 0) {
      const c = new U({ size: 1, sizeAttenuation: false }), l = new gt();
      l.setAttribute("position", new I(e.vertices, 3)), e.colors.length > 0 && e.colors[0] !== void 0 && (l.setAttribute("color", new I(e.colors, 3)), c.vertexColors = true);
      const r = new $(l, c);
      n.add(r);
    }
    return n;
  }
}
function xt(o) {
  const t = new Jt().setFromObject(o), e = t.getCenter(new x());
  o.position.sub(e), o.userData.size = t.getSize(new x());
}
async function we(o, t) {
  const e = new ve(), s = (a) => new Promise((c, l) => {
    e.load(a, (r) => {
      c(r);
    }, void 0, (r) => {
      console.error(`Failed to load ${a}`, r), l(r);
    });
  }), i = await s("models/MaleBaseMesh.obj");
  i.traverse((a) => {
    a.isMesh && (a.material = t);
  }), xt(i), o.add(i);
  const n = await s("models/FemaleBaseMesh.obj");
  return n.traverse((a) => {
    a.isMesh && (a.material = t);
  }), n.scale.set(0.5, 0.5, 0.5), xt(n), n.visible = false, o.add(n), { maleModel: i, femaleModel: n };
}
let k;
const Mt = new Tt();
function ke(o) {
  k = o, Ee();
}
function Ee() {
  const o = document.getElementById("textureInput");
  document.getElementById("addTattooBtn").addEventListener("click", () => o.click()), o.onchange = (t) => {
    const e = t.target.files[0];
    if (e && e.type.startsWith("image/")) {
      const s = new FileReader();
      s.onload = (i) => {
        const n = new Image();
        n.onload = () => {
          const a = { id: Date.now(), image: n, uv: new D(0.5, 0.5), size: 0.1, rotation: 0, visible: true, opacity: 1, lastIntersect: null };
          k.tattooLayers.push(a), X(a);
        }, n.src = i.target.result;
      }, s.readAsDataURL(e);
    }
  }, document.getElementById("tattooSizeSlider").oninput = (t) => {
    k.activeLayer && (k.activeLayer.size = parseFloat(t.target.value));
  }, document.getElementById("tattooRotationSlider").oninput = (t) => {
    k.activeLayer && (k.activeLayer.rotation = parseFloat(t.target.value));
  }, document.getElementById("tattooOpacitySlider").oninput = (t) => {
    k.activeLayer && (k.activeLayer.opacity = parseFloat(t.target.value));
  };
}
function K() {
  const o = document.getElementById("layers-list");
  o.innerHTML = "", [...k.tattooLayers].reverse().forEach((t) => {
    const e = document.createElement("li");
    e.className = "layer-item", e.addEventListener("click", () => X(t)), k.activeLayer && t.id === k.activeLayer.id && e.classList.add("active"), t.visible || e.classList.add("hidden");
    const s = document.createElement("img");
    s.src = t.image.src, s.addEventListener("click", (l) => {
      l.stopPropagation();
      const r = document.createElement("input");
      r.type = "file", r.accept = "image/*", r.onchange = (h) => {
        const d = h.target.files[0];
        if (d) {
          const p = new FileReader();
          p.onload = (u) => {
            const f = new Image();
            f.onload = () => {
              t.image = f, K();
            }, f.src = u.target.result;
          }, p.readAsDataURL(d);
        }
      }, r.click();
    });
    const i = document.createElement("span");
    i.textContent = `Layer ${t.id}`.slice(-6);
    const n = document.createElement("div");
    n.className = "layer-controls";
    const a = document.createElement("button");
    a.className = "toggle-visibility-btn", a.innerHTML = "\u{1F441}\uFE0F", a.addEventListener("click", (l) => {
      l.stopPropagation(), t.visible = !t.visible, K();
    });
    const c = document.createElement("button");
    c.textContent = "X", c.className = "delete", c.addEventListener("click", (l) => {
      if (l.stopPropagation(), k.tattooLayers = k.tattooLayers.filter((r) => r.id !== t.id), k.activeLayer && k.activeLayer.id === t.id) {
        const r = k.tattooLayers.length > 0 ? k.tattooLayers[k.tattooLayers.length - 1] : null;
        X(r);
      } else K();
    }), n.appendChild(a), n.appendChild(c), e.appendChild(s), e.appendChild(i), e.appendChild(n), o.appendChild(e);
  });
}
function X(o) {
  k.activeLayer = o;
  const t = document.getElementById("layer-editor");
  if (o) {
    if (t.style.display = "block", document.getElementById("tattooSizeSlider").value = o.size, document.getElementById("tattooRotationSlider").value = o.rotation, document.getElementById("tattooOpacitySlider").value = o.opacity, !o.lastIntersect) {
      Mt.setFromCamera(new D(0, 0), k.camera);
      const e = Mt.intersectObject(k.currentModel, true);
      if (e.length > 0) {
        const s = e[0];
        o.uv = s.uv, o.lastIntersect = s.point;
      } else console.warn("Could not find an initial intersection point for the new layer.");
    }
  } else t.style.display = "none";
  K();
}
let _;
const Pt = new Tt(), tt = new D();
let Z = false, et = false, O = {}, rt = false, it = { x: 0, y: 0 };
function Le(o) {
  _ = o;
  const t = _.renderer.domElement;
  t.addEventListener("click", (i) => St(i, false)), t.addEventListener("mousedown", (i) => {
    rt = false, it = { x: i.clientX, y: i.clientY }, _.pivotHelper && (_.pivotHelper.visible = true);
  }), t.addEventListener("mousemove", (i) => {
    const n = i.clientX - it.x, a = i.clientY - it.y;
    Math.sqrt(n * n + a * a) > 5 && (rt = true);
  }), t.addEventListener("mouseup", () => {
    _.pivotHelper && (_.pivotHelper.visible = false);
  });
  const e = document.getElementById("move-handle"), s = document.getElementById("scale-rotate-handle");
  e.addEventListener("mousedown", (i) => {
    i.stopPropagation(), Z = true, _.controls.enabled = false;
  }), s.addEventListener("mousedown", (i) => {
    i.stopPropagation(), et = true, _.controls.enabled = false;
    const n = lt(_.activeLayer.lastIntersect, _.camera);
    i.clientX, i.clientY, O.size = _.activeLayer.size, O.rotation = _.activeLayer.rotation;
    const a = i.clientX - n.x, c = i.clientY - n.y;
    O.dragAngle = Math.atan2(c, a), O.dragDist = Math.sqrt(a * a + c * c);
  }), window.addEventListener("mousemove", (i) => {
    if (Z && St(i, true), et) {
      if (!_.activeLayer || !_.activeLayer.lastIntersect) return;
      const n = lt(_.activeLayer.lastIntersect, _.camera), a = i.clientX - n.x, c = i.clientY - n.y, l = Math.atan2(c, a), r = Math.sqrt(a * a + c * c), h = l - O.dragAngle;
      if (_.activeLayer.rotation = O.rotation + h * 180 / Math.PI, document.getElementById("tattooRotationSlider").value = _.activeLayer.rotation, O.dragDist > 0) {
        const d = r / O.dragDist;
        _.activeLayer.size = O.size * d, document.getElementById("tattooSizeSlider").value = _.activeLayer.size;
      }
    }
  }), window.addEventListener("mouseup", () => {
    Z = false, et = false, _.controls.enabled = true;
  });
}
function xe(o) {
  _ = o;
  const t = document.getElementById("move-handle"), e = document.getElementById("scale-rotate-handle");
  if (t && !t.querySelector("svg") && (t.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;display:block;pointer-events:none;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2v16M2 10h16M5 5l10 10M15 5L5 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>`), e && !e.querySelector("svg") && (e.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;display:block;pointer-events:none;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3a7 7 0 1 1-7 7" stroke="white" stroke-width="2" fill="none"/>
            <polygon points="10,0 13,7 7,7" fill="white"/>
        </svg>`), !_.activeLayer || !_.activeLayer.lastIntersect) {
    t.style.display = "none", e.style.display = "none";
    return;
  }
  const s = _.activeLayer.lastIntersect.clone(), i = lt(s, _.camera);
  t.style.display = "block", t.style.left = `${i.x}px`, t.style.top = `${i.y}px`;
  const n = 60;
  e.style.display = "block", e.style.left = `${i.x + n}px`, e.style.top = `${i.y}px`;
}
function lt(o, t) {
  const e = o.clone();
  e.project(t);
  const s = (e.x * 0.5 + 0.5) * window.innerWidth, i = (e.y * -0.5 + 0.5) * window.innerHeight;
  return { x: s, y: i };
}
function St(o, t = false) {
  if (t && !Z || !t && rt) return;
  const e = document.querySelectorAll("#layers-panel, #side-menu, #hamburger-btn");
  for (const i of e) if (i.contains(o.target)) return;
  tt.x = o.clientX / window.innerWidth * 2 - 1, tt.y = -(o.clientY / window.innerHeight) * 2 + 1, Pt.setFromCamera(tt, _.camera);
  const s = Pt.intersectObject(_.currentModel, true);
  if (s.length > 0) {
    if (_.activeLayer) {
      const i = s[0];
      _.activeLayer.uv = i.uv, _.activeLayer.lastIntersect = i.point;
    }
  } else t || X(null);
}
/*!
* vanilla-picker v2.12.3
* https://vanilla-picker.js.org
*
* Copyright 2017-2024 Andreas Borgen (https://github.com/Sphinxxxx), Adam Brooks (https://github.com/dissimulate)
* Released under the ISC license.
*/
var ht = function(o, t) {
  if (!(o instanceof t)) throw new TypeError("Cannot call a class as a function");
}, dt = /* @__PURE__ */ (function() {
  function o(t, e) {
    for (var s = 0; s < e.length; s++) {
      var i = e[s];
      i.enumerable = i.enumerable || false, i.configurable = true, "value" in i && (i.writable = true), Object.defineProperty(t, i.key, i);
    }
  }
  return function(t, e, s) {
    return e && o(t.prototype, e), s && o(t, s), t;
  };
})(), Y = /* @__PURE__ */ (function() {
  function o(t, e) {
    var s = [], i = true, n = false, a = void 0;
    try {
      for (var c = t[Symbol.iterator](), l; !(i = (l = c.next()).done) && (s.push(l.value), !(e && s.length === e)); i = true) ;
    } catch (r) {
      n = true, a = r;
    } finally {
      try {
        !i && c.return && c.return();
      } finally {
        if (n) throw a;
      }
    }
    return s;
  }
  return function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return o(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
})();
String.prototype.startsWith = String.prototype.startsWith || function(o) {
  return this.indexOf(o) === 0;
};
String.prototype.padStart = String.prototype.padStart || function(o, t) {
  for (var e = this; e.length < o; ) e = t + e;
  return e;
};
var Me = { cb: "0f8ff", tqw: "aebd7", q: "-ffff", qmrn: "7fffd4", zr: "0ffff", bg: "5f5dc", bsq: "e4c4", bck: "---", nch: "ebcd", b: "--ff", bvt: "8a2be2", brwn: "a52a2a", brw: "deb887", ctb: "5f9ea0", hrt: "7fff-", chcT: "d2691e", cr: "7f50", rnw: "6495ed", crns: "8dc", crms: "dc143c", cn: "-ffff", Db: "--8b", Dcn: "-8b8b", Dgnr: "b8860b", Dgr: "a9a9a9", Dgrn: "-64-", Dkhk: "bdb76b", Dmgn: "8b-8b", Dvgr: "556b2f", Drng: "8c-", Drch: "9932cc", Dr: "8b--", Dsmn: "e9967a", Dsgr: "8fbc8f", DsTb: "483d8b", DsTg: "2f4f4f", Dtrq: "-ced1", Dvt: "94-d3", ppnk: "1493", pskb: "-bfff", mgr: "696969", grb: "1e90ff", rbrc: "b22222", rwht: "af0", stg: "228b22", chs: "-ff", gnsb: "dcdcdc", st: "8f8ff", g: "d7-", gnr: "daa520", gr: "808080", grn: "-8-0", grnw: "adff2f", hnw: "0fff0", htpn: "69b4", nnr: "cd5c5c", ng: "4b-82", vr: "0", khk: "0e68c", vnr: "e6e6fa", nrb: "0f5", wngr: "7cfc-", mnch: "acd", Lb: "add8e6", Lcr: "08080", Lcn: "e0ffff", Lgnr: "afad2", Lgr: "d3d3d3", Lgrn: "90ee90", Lpnk: "b6c1", Lsmn: "a07a", Lsgr: "20b2aa", Lskb: "87cefa", LsTg: "778899", Lstb: "b0c4de", Lw: "e0", m: "-ff-", mgrn: "32cd32", nn: "af0e6", mgnt: "-ff", mrn: "8--0", mqm: "66cdaa", mmb: "--cd", mmrc: "ba55d3", mmpr: "9370db", msg: "3cb371", mmsT: "7b68ee", "": "-fa9a", mtr: "48d1cc", mmvt: "c71585", mnLb: "191970", ntc: "5fffa", mstr: "e4e1", mccs: "e4b5", vjw: "dead", nv: "--80", c: "df5e6", v: "808-0", vrb: "6b8e23", rng: "a5-", rngr: "45-", rch: "da70d6", pgnr: "eee8aa", pgrn: "98fb98", ptrq: "afeeee", pvtr: "db7093", ppwh: "efd5", pchp: "dab9", pr: "cd853f", pnk: "c0cb", pm: "dda0dd", pwrb: "b0e0e6", prp: "8-080", cc: "663399", r: "--", sbr: "bc8f8f", rb: "4169e1", sbrw: "8b4513", smn: "a8072", nbr: "4a460", sgrn: "2e8b57", ssh: "5ee", snn: "a0522d", svr: "c0c0c0", skb: "87ceeb", sTb: "6a5acd", sTgr: "708090", snw: "afa", n: "-ff7f", stb: "4682b4", tn: "d2b48c", t: "-8080", thst: "d8bfd8", tmT: "6347", trqs: "40e0d0", vt: "ee82ee", whT: "5deb3", wht: "", hts: "5f5f5", w: "-", wgrn: "9acd32" };
function Dt(o) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, e = t > 0 ? o.toFixed(t).replace(/0+$/, "").replace(/\.$/, "") : o.toString();
  return e || "0";
}
var Pe = (function() {
  function o(t, e, s, i) {
    ht(this, o);
    var n = this;
    function a(l) {
      if (l.startsWith("hsl")) {
        var r = l.match(/([\-\d\.e]+)/g).map(Number), h = Y(r, 4), d = h[0], p = h[1], u = h[2], f = h[3];
        f === void 0 && (f = 1), d /= 360, p /= 100, u /= 100, n.hsla = [d, p, u, f];
      } else if (l.startsWith("rgb")) {
        var g = l.match(/([\-\d\.e]+)/g).map(Number), m = Y(g, 4), v = m[0], b = m[1], R = m[2], M = m[3];
        M === void 0 && (M = 1), n.rgba = [v, b, R, M];
      } else l.startsWith("#") ? n.rgba = o.hexToRgb(l) : n.rgba = o.nameToRgb(l) || o.hexToRgb(l);
    }
    if (t !== void 0) if (Array.isArray(t)) this.rgba = t;
    else if (s === void 0) {
      var c = t && "" + t;
      c && a(c.toLowerCase());
    } else this.rgba = [t, e, s, i === void 0 ? 1 : i];
  }
  return dt(o, [{ key: "printRGB", value: function(e) {
    var s = e ? this.rgba : this.rgba.slice(0, 3), i = s.map(function(n, a) {
      return Dt(n, a === 3 ? 3 : 0);
    });
    return e ? "rgba(" + i + ")" : "rgb(" + i + ")";
  } }, { key: "printHSL", value: function(e) {
    var s = [360, 100, 100, 1], i = ["", "%", "%", ""], n = e ? this.hsla : this.hsla.slice(0, 3), a = n.map(function(c, l) {
      return Dt(c * s[l], l === 3 ? 3 : 1) + i[l];
    });
    return e ? "hsla(" + a + ")" : "hsl(" + a + ")";
  } }, { key: "printHex", value: function(e) {
    var s = this.hex;
    return e ? s : s.substring(0, 7);
  } }, { key: "rgba", get: function() {
    if (this._rgba) return this._rgba;
    if (!this._hsla) throw new Error("No color is set");
    return this._rgba = o.hslToRgb(this._hsla);
  }, set: function(e) {
    e.length === 3 && (e[3] = 1), this._rgba = e, this._hsla = null;
  } }, { key: "rgbString", get: function() {
    return this.printRGB();
  } }, { key: "rgbaString", get: function() {
    return this.printRGB(true);
  } }, { key: "hsla", get: function() {
    if (this._hsla) return this._hsla;
    if (!this._rgba) throw new Error("No color is set");
    return this._hsla = o.rgbToHsl(this._rgba);
  }, set: function(e) {
    e.length === 3 && (e[3] = 1), this._hsla = e, this._rgba = null;
  } }, { key: "hslString", get: function() {
    return this.printHSL();
  } }, { key: "hslaString", get: function() {
    return this.printHSL(true);
  } }, { key: "hex", get: function() {
    var e = this.rgba, s = e.map(function(i, n) {
      return n < 3 ? i.toString(16) : Math.round(i * 255).toString(16);
    });
    return "#" + s.map(function(i) {
      return i.padStart(2, "0");
    }).join("");
  }, set: function(e) {
    this.rgba = o.hexToRgb(e);
  } }], [{ key: "hexToRgb", value: function(e) {
    var s = (e.startsWith("#") ? e.slice(1) : e).replace(/^(\w{3})$/, "$1F").replace(/^(\w)(\w)(\w)(\w)$/, "$1$1$2$2$3$3$4$4").replace(/^(\w{6})$/, "$1FF");
    if (!s.match(/^([0-9a-fA-F]{8})$/)) throw new Error("Unknown hex color; " + e);
    var i = s.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function(n) {
      return parseInt(n, 16);
    });
    return i[3] = i[3] / 255, i;
  } }, { key: "nameToRgb", value: function(e) {
    var s = e.toLowerCase().replace("at", "T").replace(/[aeiouyldf]/g, "").replace("ght", "L").replace("rk", "D").slice(-5, 4), i = Me[s];
    return i === void 0 ? i : o.hexToRgb(i.replace(/\-/g, "00").padStart(6, "f"));
  } }, { key: "rgbToHsl", value: function(e) {
    var s = Y(e, 4), i = s[0], n = s[1], a = s[2], c = s[3];
    i /= 255, n /= 255, a /= 255;
    var l = Math.max(i, n, a), r = Math.min(i, n, a), h = void 0, d = void 0, p = (l + r) / 2;
    if (l === r) h = d = 0;
    else {
      var u = l - r;
      switch (d = p > 0.5 ? u / (2 - l - r) : u / (l + r), l) {
        case i:
          h = (n - a) / u + (n < a ? 6 : 0);
          break;
        case n:
          h = (a - i) / u + 2;
          break;
        case a:
          h = (i - n) / u + 4;
          break;
      }
      h /= 6;
    }
    return [h, d, p, c];
  } }, { key: "hslToRgb", value: function(e) {
    var s = Y(e, 4), i = s[0], n = s[1], a = s[2], c = s[3], l = void 0, r = void 0, h = void 0;
    if (n === 0) l = r = h = a;
    else {
      var d = function(m, v, b) {
        return b < 0 && (b += 1), b > 1 && (b -= 1), b < 0.16666666666666666 ? m + (v - m) * 6 * b : b < 0.5 ? v : b < 0.6666666666666666 ? m + (v - m) * (0.6666666666666666 - b) * 6 : m;
      }, p = a < 0.5 ? a * (1 + n) : a + n - a * n, u = 2 * a - p;
      l = d(u, p, i + 1 / 3), r = d(u, p, i), h = d(u, p, i - 1 / 3);
    }
    var f = [l * 255, r * 255, h * 255].map(Math.round);
    return f[3] = c, f;
  } }]), o;
})(), Se = (function() {
  function o() {
    ht(this, o), this._events = [];
  }
  return dt(o, [{ key: "add", value: function(e, s, i) {
    e.addEventListener(s, i, false), this._events.push({ target: e, type: s, handler: i });
  } }, { key: "remove", value: function(e, s, i) {
    this._events = this._events.filter(function(n) {
      var a = true;
      return e && e !== n.target && (a = false), s && s !== n.type && (a = false), i && i !== n.handler && (a = false), a && o._doRemove(n.target, n.type, n.handler), !a;
    });
  } }, { key: "destroy", value: function() {
    this._events.forEach(function(e) {
      return o._doRemove(e.target, e.type, e.handler);
    }), this._events = [];
  } }], [{ key: "_doRemove", value: function(e, s, i) {
    e.removeEventListener(s, i, false);
  } }]), o;
})();
function De(o) {
  var t = document.createElement("div");
  return t.innerHTML = o, t.firstElementChild;
}
function st(o, t, e) {
  var s = false;
  function i(l, r, h) {
    return Math.max(r, Math.min(l, h));
  }
  function n(l, r, h) {
    if (h && (s = true), !!s) {
      l.preventDefault();
      var d = t.getBoundingClientRect(), p = d.width, u = d.height, f = r.clientX, g = r.clientY, m = i(f - d.left, 0, p), v = i(g - d.top, 0, u);
      e(m / p, v / u);
    }
  }
  function a(l, r) {
    var h = l.buttons === void 0 ? l.which : l.buttons;
    h === 1 ? n(l, l, r) : s = false;
  }
  function c(l, r) {
    l.touches.length === 1 ? n(l, l.touches[0], r) : s = false;
  }
  o.add(t, "mousedown", function(l) {
    a(l, true);
  }), o.add(t, "touchstart", function(l) {
    c(l, true);
  }), o.add(window, "mousemove", a), o.add(t, "touchmove", c), o.add(window, "mouseup", function(l) {
    s = false;
  }), o.add(t, "touchend", function(l) {
    s = false;
  }), o.add(t, "touchcancel", function(l) {
    s = false;
  });
}
var Ce = `linear-gradient(45deg, lightgrey 25%, transparent 25%, transparent 75%, lightgrey 75%) 0 0 / 2em 2em,
                   linear-gradient(45deg, lightgrey 25%,       white 25%,       white 75%, lightgrey 75%) 1em 1em / 2em 2em`, Te = 360, Ot = "keydown", V = "mousedown", nt = "focusin";
function j(o, t) {
  return (t || document).querySelector(o);
}
function je(o) {
  o.preventDefault(), o.stopPropagation();
}
function ot(o, t, e, s, i) {
  o.add(t, Ot, function(n) {
    e.indexOf(n.key) >= 0 && s(n);
  });
}
var Rt = (function() {
  function o(t) {
    ht(this, o), this.settings = { popup: "right", layout: "default", alpha: true, editor: true, editorFormat: "hex", cancelButton: false, defaultColor: "#0cf" }, this._events = new Se(), this.onChange = null, this.onDone = null, this.onOpen = null, this.onClose = null, this.setOptions(t);
  }
  return dt(o, [{ key: "setOptions", value: function(e) {
    var s = this;
    if (!e) return;
    var i = this.settings;
    function n(r, h, d) {
      for (var p in r) h[p] = r[p];
    }
    if (e instanceof HTMLElement) i.parent = e;
    else {
      i.parent && e.parent && i.parent !== e.parent && (this._events.remove(i.parent), this._popupInited = false), n(e, i), e.onChange && (this.onChange = e.onChange), e.onDone && (this.onDone = e.onDone), e.onOpen && (this.onOpen = e.onOpen), e.onClose && (this.onClose = e.onClose);
      var a = e.color || e.colour;
      a && this._setColor(a);
    }
    var c = i.parent;
    if (c && i.popup && !this._popupInited) {
      var l = function(h) {
        return s.openHandler(h);
      };
      this._events.add(c, "click", l), ot(this._events, c, [" ", "Spacebar", "Enter"], l), this._popupInited = true;
    } else e.parent && !i.popup && this.show();
  } }, { key: "openHandler", value: function(e) {
    if (this.show()) {
      e && e.preventDefault(), this.settings.parent.style.pointerEvents = "none";
      var s = e && e.type === Ot ? this._domEdit : this.domElement;
      setTimeout(function() {
        return s.focus();
      }, 100), this.onOpen && this.onOpen(this.colour);
    }
  } }, { key: "closeHandler", value: function(e) {
    var s = e && e.type, i = false;
    if (!e) i = true;
    else if (s === V || s === nt) {
      var n = (this.__containedEvent || 0) + 100;
      e.timeStamp > n && (i = true);
    } else je(e), i = true;
    i && this.hide() && (this.settings.parent.style.pointerEvents = "", s !== V && this.settings.parent.focus(), this.onClose && this.onClose(this.colour));
  } }, { key: "movePopup", value: function(e, s) {
    this.closeHandler(), this.setOptions(e), s && this.openHandler();
  } }, { key: "setColor", value: function(e, s) {
    this._setColor(e, { silent: s });
  } }, { key: "_setColor", value: function(e, s) {
    if (typeof e == "string" && (e = e.trim()), !!e) {
      s = s || {};
      var i = void 0;
      try {
        i = new Pe(e);
      } catch (a) {
        if (s.failSilently) return;
        throw a;
      }
      if (!this.settings.alpha) {
        var n = i.hsla;
        n[3] = 1, i.hsla = n;
      }
      this.colour = this.color = i, this._setHSLA(null, null, null, null, s);
    }
  } }, { key: "setColour", value: function(e, s) {
    this.setColor(e, s);
  } }, { key: "show", value: function() {
    var e = this.settings.parent;
    if (!e) return false;
    if (this.domElement) {
      var s = this._toggleDOM(true);
      return this._setPosition(), s;
    }
    var i = this.settings.template || '<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div><div class="picker_cancel"><button>Cancel</button></div></div>', n = De(i);
    return this.domElement = n, this._domH = j(".picker_hue", n), this._domSL = j(".picker_sl", n), this._domA = j(".picker_alpha", n), this._domEdit = j(".picker_editor input", n), this._domSample = j(".picker_sample", n), this._domOkay = j(".picker_done button", n), this._domCancel = j(".picker_cancel button", n), n.classList.add("layout_" + this.settings.layout), this.settings.alpha || n.classList.add("no_alpha"), this.settings.editor || n.classList.add("no_editor"), this.settings.cancelButton || n.classList.add("no_cancel"), this._ifPopup(function() {
      return n.classList.add("popup");
    }), this._setPosition(), this.colour ? this._updateUI() : this._setColor(this.settings.defaultColor), this._bindEvents(), true;
  } }, { key: "hide", value: function() {
    return this._toggleDOM(false);
  } }, { key: "destroy", value: function() {
    this._events.destroy(), this.domElement && this.settings.parent.removeChild(this.domElement);
  } }, { key: "_bindEvents", value: function() {
    var e = this, s = this, i = this.domElement, n = this._events;
    function a(r, h, d) {
      n.add(r, h, d);
    }
    a(i, "click", function(r) {
      return r.preventDefault();
    }), st(n, this._domH, function(r, h) {
      return s._setHSLA(r);
    }), st(n, this._domSL, function(r, h) {
      return s._setHSLA(null, r, 1 - h);
    }), this.settings.alpha && st(n, this._domA, function(r, h) {
      return s._setHSLA(null, null, null, 1 - h);
    });
    var c = this._domEdit;
    a(c, "input", function(r) {
      s._setColor(this.value, { fromEditor: true, failSilently: true });
    }), a(c, "focus", function(r) {
      var h = this;
      h.selectionStart === h.selectionEnd && h.select();
    }), this._ifPopup(function() {
      var r = function(p) {
        return e.closeHandler(p);
      };
      a(window, V, r), a(window, nt, r), ot(n, i, ["Esc", "Escape"], r);
      var h = function(p) {
        e.__containedEvent = p.timeStamp;
      };
      a(i, V, h), a(i, nt, h), a(e._domCancel, "click", r);
    });
    var l = function(h) {
      e._ifPopup(function() {
        return e.closeHandler(h);
      }), e.onDone && e.onDone(e.colour);
    };
    a(this._domOkay, "click", l), ot(n, i, ["Enter"], l);
  } }, { key: "_setPosition", value: function() {
    var e = this.settings.parent, s = this.domElement;
    e !== s.parentNode && e.appendChild(s), this._ifPopup(function(i) {
      getComputedStyle(e).position === "static" && (e.style.position = "relative");
      var n = i === true ? "popup_right" : "popup_" + i;
      ["popup_top", "popup_bottom", "popup_left", "popup_right"].forEach(function(a) {
        a === n ? s.classList.add(a) : s.classList.remove(a);
      }), s.classList.add(n);
    });
  } }, { key: "_setHSLA", value: function(e, s, i, n, a) {
    a = a || {};
    var c = this.colour, l = c.hsla;
    [e, s, i, n].forEach(function(r, h) {
      (r || r === 0) && (l[h] = r);
    }), c.hsla = l, this._updateUI(a), this.onChange && !a.silent && this.onChange(c);
  } }, { key: "_updateUI", value: function(e) {
    if (!this.domElement) return;
    e = e || {};
    var s = this.colour, i = s.hsla, n = "hsl(" + i[0] * Te + ", 100%, 50%)", a = s.hslString, c = s.hslaString, l = this._domH, r = this._domSL, h = this._domA, d = j(".picker_selector", l), p = j(".picker_selector", r), u = j(".picker_selector", h);
    function f(w, C, G) {
      C.style.left = G * 100 + "%";
    }
    function g(w, C, G) {
      C.style.top = G * 100 + "%";
    }
    f(l, d, i[0]), this._domSL.style.backgroundColor = this._domH.style.color = n, f(r, p, i[1]), g(r, p, 1 - i[2]), r.style.color = a, g(h, u, 1 - i[3]);
    var m = a, v = m.replace("hsl", "hsla").replace(")", ", 0)"), b = "linear-gradient(" + [m, v] + ")";
    if (this._domA.style.background = b + ", " + Ce, !e.fromEditor) {
      var R = this.settings.editorFormat, M = this.settings.alpha, A = void 0;
      switch (R) {
        case "rgb":
          A = s.printRGB(M);
          break;
        case "hsl":
          A = s.printHSL(M);
          break;
        default:
          A = s.printHex(M);
      }
      this._domEdit.value = A;
    }
    this._domSample.style.color = c;
  } }, { key: "_ifPopup", value: function(e, s) {
    this.settings.parent && this.settings.popup ? e && e(this.settings.popup) : s && s();
  } }, { key: "_toggleDOM", value: function(e) {
    var s = this.domElement;
    if (!s) return false;
    var i = e ? "" : "none", n = s.style.display !== i;
    return n && (s.style.display = i), n;
  } }]), o;
})();
{
  var at = document.createElement("style");
  at.textContent = '.picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.picker_wrapper.no_cancel .picker_cancel{display:none}.layout_default.picker_wrapper{display:flex;flex-flow:row wrap;justify-content:space-between;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:"";display:block;width:100%;height:0;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{flex:1 1 auto}.layout_default .picker_sl::before{content:"";display:block;padding-bottom:100%}.layout_default .picker_editor{order:1;width:6.5rem}.layout_default .picker_editor input{width:100%;height:100%}.layout_default .picker_sample{order:1;flex:1 1 auto}.layout_default .picker_done,.layout_default .picker_cancel{order:1}.picker_wrapper{box-sizing:border-box;background:#f2f2f2;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{box-sizing:border-box;border:none;box-shadow:0 0 0 1px silver;outline:none}.picker_wrapper button:focus,.picker_wrapper button:active,.picker_wrapper input:focus,.picker_wrapper input:active{box-shadow:0 0 2px 1px #1e90ff}.picker_wrapper button{padding:.4em .6em;cursor:pointer;background-color:#f5f5f5;background-image:linear-gradient(0deg, gainsboro, transparent)}.picker_wrapper button:active{background-image:linear-gradient(0deg, transparent, gainsboro)}.picker_wrapper button:hover{background-color:#fff}.picker_selector{position:absolute;z-index:1;display:block;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:2px solid #fff;border-radius:100%;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);box-shadow:0 0 0 1px silver}.picker_sl{position:relative;box-shadow:0 0 0 1px silver;background-image:linear-gradient(180deg, white, rgba(255, 255, 255, 0) 50%),linear-gradient(0deg, black, rgba(0, 0, 0, 0) 50%),linear-gradient(90deg, #808080, rgba(128, 128, 128, 0))}.picker_alpha,.picker_sample{position:relative;background:linear-gradient(45deg, lightgrey 25%, transparent 25%, transparent 75%, lightgrey 75%) 0 0/2em 2em,linear-gradient(45deg, lightgrey 25%, white 25%, white 75%, lightgrey 75%) 1em 1em/2em 2em;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{font-family:monospace;padding:.2em .4em}.picker_sample::before{content:"";position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:"";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;-webkit-transform:skew(45deg);transform:skew(45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;-webkit-transform:rotate(90deg) scale(1, -1);transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}', document.documentElement.firstElementChild.appendChild(at), Rt.StyleElement = at;
}
let P;
async function Oe(o) {
  P = o, P.selectedColor = new N(14724201), Re(), ke(P), Le(P);
}
function Re() {
  const o = document.getElementById("hamburger-btn"), t = document.getElementById("side-menu");
  o.addEventListener("click", (l) => {
    l.stopPropagation(), t.classList.toggle("open"), o.classList.toggle("open");
  }), window.addEventListener("click", (l) => {
    !t.contains(l.target) && !o.contains(l.target) && (t.classList.remove("open"), o.classList.remove("open"));
  });
  const e = [2492161, 4000770, 8664866, 11497041, 13013110, 14724201, 15843965, 16768176], s = document.getElementById("paletteContainer"), i = new N(e[5]);
  P.selectedColor.set(i), e.forEach((l) => {
    const r = document.createElement("div");
    r.className = "swatch", r.style.backgroundColor = `#${new N(l).getHexString()}`, r.addEventListener("click", () => {
      P.selectedColor.set(l);
    }), s.appendChild(r);
  });
  const n = document.getElementById("switchModelBtn");
  n.textContent = "Switch to Feminine", n.addEventListener("click", () => {
    P.currentModel.visible = false, P.currentModel === P.maleModel ? (P.currentModel = P.femaleModel, n.textContent = "Switch to Masculine") : (P.currentModel = P.maleModel, n.textContent = "Switch to Feminine"), P.currentModel.visible = true;
  });
  const a = document.getElementById("backgroundColorPicker");
  var c = new Rt({ parent: a, popup: false, alpha: false, color: "#f0f0f0" });
  c.onChange = function(l) {
    P.scene.background.set(l.rgbString);
  };
}
function Ae(o) {
  const t = o.textureContext;
  if (!t) return;
  const e = document.getElementById("intensitySlider"), s = e ? e.value : 1, i = o.selectedColor.clone();
  s < 1 && i.lerp(new N(0), 1 - s), t.fillStyle = `#${i.getHexString()}`, t.fillRect(0, 0, t.canvas.width, t.canvas.height), o.tattooLayers.forEach((n) => {
    if (!n.visible) return;
    const a = t.canvas.width * n.size, c = n.uv.x * t.canvas.width, l = (1 - n.uv.y) * t.canvas.height;
    t.save(), t.globalAlpha = n.opacity, t.translate(c, l), t.rotate(n.rotation * Math.PI / 180), t.drawImage(n.image, -a / 2, -a / 2, a, a), t.restore();
  }), o.texture && (o.texture.needsUpdate = true);
}
const E = { scene: null, camera: null, renderer: null, controls: null, maleModel: null, femaleModel: null, currentModel: null, skinMaterial: null, selectedColor: null, tattooLayers: [], activeLayer: null, textureContext: null, texture: null, pivotHelper: null };
async function Ie() {
  try {
    const o = fe();
    Object.assign(E, o);
    const t = await we(E.scene, E.skinMaterial);
    E.maleModel = t.maleModel, E.femaleModel = t.femaleModel, E.currentModel = E.maleModel, await Oe(E), At();
  } catch (o) {
    console.error("Failed to initialize the application:", o), document.body.innerHTML = `<div style="padding: 20px; font-family: monospace;"><h1>Application Error</h1><p>Could not start. Please check the console for details.</p><pre>${o.stack}</pre></div>`;
  }
}
function At() {
  requestAnimationFrame(At), E.controls.update(), E.pivotHelper && E.pivotHelper.visible && (E.pivotHelper.position.copy(E.controls.target), E.pivotHelper.lookAt(E.camera.position)), xe(E), Ae(E), E.renderer.render(E.scene, E.camera);
}
Ie();
