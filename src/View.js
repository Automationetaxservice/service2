import classNames from "classnames";
import React from 'react';
//import Calendar from './calendario';
import { type } from "jquery";

const exports = {};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var functions = require("./functions");
let modalScriptFunction = require("./modalscript");
var _Lista = require("./salesforceValues");

var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.css"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }



var ContactosView = function (_Component) {
    _inherits(ContactosView, _Component);
    var _super = _createSuper(ContactosView);
    function ContactosView(props){
        var _this;
        _classCallCheck(this, ContactosView);
        _this = _super.call(this, props);
        return _this;
    }
    _createClass(
        ContactosView, [
            {
                key: "render",
                value: function render() {
                    return  _react["default"].createElement("section",{
                                    id: "modalScript",
                                    className: 'ModalScript',
                                    //style: { width: '40%' }
                                }
                                ,_react["default"].createElement("section",{
                                        id: "eventoModal",
                                        className: "modal hidden"
                                    }
                                    ,_react["default"].createElement("div",{
                                            id: "modalChild",
                                        }
                                    )
                                    ,_react["default"].createElement("div",{
                                            style: {display: 'flex', justifyContent: 'right'}
                                        }
                                        ,_react["default"].createElement("div",{
                                                id: "enviarEvento",
                                                className: "modalScriptButton",
                                                onClick: () => {_Lista.agregarEvento();}
                                            }, "Agregar"
                                        )
                                        ,_react["default"].createElement("div",{
                                                id: "updateEvento",
                                                className: "modalScriptButton hidden",
                                                onClick: () => {_Lista.updateEvento();}
                                            }, "Actualizar"
                                        )
                                    )
                                )
                                ,_react["default"].createElement("div",{
                                        id: "messageSuccess",
                                        className: "success hidden"
                                    }
                                    ,_react["default"].createElement("span",{
                                            className: "successMessage"
                                        }, "Guardado exitosamente"
                                    )
                                )
                                ,_react["default"].createElement("div",{
                                        id: "messageError",
                                        className: "error hidden"
                                    }
                                    ,_react["default"].createElement("span",{
                                            className: "errorMessage"
                                        }, "Hubo un error, vuelve a intentarlo más tarde"
                                    )
                                )
                                ,_react["default"].createElement("div",{
                                        id: "messageWarning",
                                        className: "warning hidden"
                                    }
                                )
                                ,_react["default"].createElement("br",{})
                                ,_react["default"].createElement("div",{
                                        className: "modalScriptHeader"
                                    }
                                    ,_react["default"].createElement("label",{
                                        className: "labelModal"
                                        }, "Customer Service Name:"
                                    )
                                ),_react["default"].createElement("div",{
                                        className: "modalScriptRow"
                                    }
                                    ,_react["default"].createElement("div",{ className: "col_6" } 
                                        ,_react["default"].createElement("select",{
                                                id: "csList",
                                                name: "csList",
                                                className: "selectScript",
                                                onChange : () => {modalScriptFunction.cambiarContactScript();}
                                            }
                                        
                                        )
                                    )
                                    ,_react["default"].createElement("div",{
                                            className: "divModalScriptButtons col_6"
                                        }
                                        ,_react["default"].createElement("a",{
                                                id: "modalScriptPrevious",
                                                className: "modalScriptButton disabled",
                                                onClick: () => {functions.previousScript();}
                                            }, "Previous"
                                        )
                                        ,_react["default"].createElement("a",{
                                                id: "modalScriptNext",
                                                className: "modalScriptButton disabled",
                                                onClick: () => {functions.nextScript();}
                                            }, "Next"
                                        )
                                    )
                                )
                                ,_react["default"].createElement("div",{
                                        id: "modalScriptBody",
                                    }
                                    ,_react["default"].createElement("div",{
                                            id: "modalScriptGreeting",
                                            className: "active"
                                        }
                                    )
                                    ,_react["default"].createElement("div",{
                                            id: "modalScriptAuthentication",
                                            className: "hidden"
                                        }
                                    )
                                    ,_react["default"].createElement("div",{
                                            id: "modalScriptProblem",
                                            className: "hidden"
                                        }
                                        ,_react["default"].createElement("div", {
                                                className: "divTituloModal"
                                            }
                                            ,_react["default"].createElement("h4", {
                                                    className: "tituloModal"
                                                }, "3. Problem / Issues Definition"
                                            )
                                        )
                                        ,_react["default"].createElement("div", {
                                                className: "modalScriptRow"
                                            }
                                            ,_react["default"].createElement("div", {
                                                    className: "col-6",
                                                    style: {marginRight: '3%'}
                                                }
                                                ,_react["default"].createElement("div", {
                                                        className: "divInputScript"
                                                    }
                                                    ,_react["default"].createElement("label", {
                                                            className: "labelModal"
                                                        }, "Search Keywords"
                                                    )
                                                )
                                                ,_react["default"].createElement("div", {
                                                        className: "divInputScript"
                                                    }
                                                    ,_react["default"].createElement("input", {
                                                            id: "keywordListName",
                                                            className: "inputModal",
                                                            onKeyUp: () => { functions.keywords(); },
                                                            placeholder: "Search..."
                                                        }
                                                    )
                                                    ,_react["default"].createElement("input", {
                                                            id: "keywordList",
                                                            name: "keywordList",
                                                            className: "hidden"
                                                        }
                                                    )
                                                    ,_react["default"].createElement("div", {
                                                            id: "keywordListResultados",
                                                            style: {position: 'absolute', background: 'white', width: '96%'}
                                                        }
                                                    )
                                                )
                                            )
                                            ,_react["default"].createElement("div", {
                                                    className: "col-3"
                                                }
                                                ,_react["default"].createElement("div", {
                                                        className: "divInputScript"
                                                    }
                                                    ,_react["default"].createElement("br", {})
                                                )
                                                ,_react["default"].createElement("div", {
                                                        className: "divInputScript"
                                                    }
                                                    ,_react["default"].createElement("a", {
                                                            id: "newCaseAuth",
                                                            className: "newCaseButton",
                                                            onClick: () => {functions.newCase();}
                                                        }, "New Case"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                    ,_react["default"].createElement("div",{
                                            id: "modalScriptProbe",
                                            className: "hidden"
                                        }
                                        ,_react["default"].createElement("div", {
                                                className: "divTituloModal"
                                            }
                                            ,_react["default"].createElement("h4", {
                                                className: "tituloModal"
                                                }, "4. Probe for Root Cause"
                                            )
                                        )
                                        ,_react["default"].createElement("span", {
                                                className: "warningMessage"
                                            }, "Para Avanzar: Se requiere mínimo agregar nota en cada sección"
                                        )
                                        ,_react["default"].createElement("br", {})
                                        ,_react["default"].createElement("br", {})
                                        ,_react["default"].createElement("div", {
                                                className: "divModalScriptButtons col_6",
                                            }
                                            ,_react["default"].createElement("div", {
                                                    className: "probeButtonDiv"
                                                }
                                                ,_react["default"].createElement("a", {
                                                        onClick: () => {modalScriptFunction.probePrevious()},
                                                        className: "newCaseButton disabled",
                                                        id: "modalScriptProbePrevious"
                                                    }, "Previous"
                                                )
                                            )
                                            ,_react["default"].createElement("div", { }
                                                ,_react["default"].createElement("a", {
                                                        onClick: () => {modalScriptFunction.probeNext()},
                                                        className: "newCaseButton",
                                                        id: "modalScriptProbeNext"
                                                    }, "Save & Next"
                                                )
                                            )
                                            ,_react["default"].createElement("div", { }
                                                ,_react["default"].createElement("a", {
                                                        onClick: () => {_Lista.probeSave()},
                                                        className: "newCaseButton hidden",
                                                        id: "modalScriptProbeSave"
                                                    }, "Save"
                                                )
                                            )
                                        )
                                        ,_react["default"].createElement("div",{
                                            id: "modalScriptProbeBody"
                                        }
                                    )
                                )
                                ,_react["default"].createElement("div",{
                                        id: "modalScriptAgreement",
                                        className: ""
                                    }
                                    ,_react["default"].createElement("div",{
                                            id: "modalScriptAgreementChild",
                                            className: "hidden"
                                        }
                                        ,_react["default"].createElement("div",{
                                                className: "divTituloModal",
                                            }
                                            ,_react["default"].createElement("h4",{
                                                    className: "tituloModal",
                                                }, "5. Agreement to Proceed"
                                            )
                                        )
                                        ,_react["default"].createElement("div",{
                                                className: "divInputScript",
                                            }
                                            ,_react["default"].createElement("div",{
                                                    className: "modalScriptRow",
                                                }
                                                ,_react["default"].createElement("div",{
                                                        style: {width: '40%'},
                                                    }
                                                    ,_react["default"].createElement("label",{
                                                            className: "labelModal",
                                                            style: {display: 'block', width: '80%', textAlign: 'justify' }
                                                        }, "Contador"
                                                    )
                                                    ,_react["default"].createElement("br",{ } )
                                                    ,_react["default"].createElement("select",{
                                                            id: "listaContador",
                                                            style: { width: '100%' },
                                                            onChange: () => {functions.calendario();}
                                                        }
                                                        ,_react["default"].createElement("option",{
                                                                value: '0053k00000AvsM4AAJ',
                                                            }, "Francis Mendoza"
                                                        )
                                                        ,_react["default"].createElement("option",{
                                                                value: '0053k00000AvrPvAAJ',
                                                            }, "Daniela Perez"
                                                        )
                                                    )
                                                )
                                                ,_react["default"].createElement("div",{
                                                        style: {width: '20%'},
                                                    }
                                                )
                                                ,_react["default"].createElement("div",{
                                                        style: {width: '40%'},
                                                    }
                                                    ,_react["default"].createElement("label",{
                                                            className: "labelModal",
                                                            style: {display: 'block', width: '80%', textAlign: 'justify' }
                                                        }, "Priority"
                                                    )
                                                    ,_react["default"].createElement("br",{ } )
                                                    ,_react["default"].createElement("select",{
                                                            id: "listaPrioridad",
                                                            style: { width: '100%' },
                                                            onChange: () => {functions.calendario();}
                                                        }
                                                        ,_react["default"].createElement("option",{ value: "Low-Mid" }, "Low-Mid" )
                                                        ,_react["default"].createElement("option",{ value: "Mid-High" }, "Mid-High" )
                                                        ,_react["default"].createElement("option",{ value: "Monthly-Clients" }, "Monthly-Clients" )
                                                        ,_react["default"].createElement("option",{ value: "Clients-Support" }, "Clients-Support" )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                    ,_react["default"].createElement("br",{ } )
                                    ,_react["default"].createElement("br",{ } )
                                    ,_react["default"].createElement("div", {
                                            id: "calendar"
                                        }
                                    )
                                )
                                ,_react["default"].createElement("div",{
                                        id: "modalScriptRecap",
                                        className: "hidden",
                                        style: {height: "1100px", overflow: "auto"}
                                    }
                                    ,_react["default"].createElement("br", {})
                                    ,_react["default"].createElement("div",{
                                            className: "menu"
                                        }
                                        ,_react["default"].createElement("div",{
                                                id: "recapScript",
                                                className: "menu-item menu_active",
                                                onClick: () => {modalScriptFunction.recapScriptMenu()}
                                            }, "Recap Script"
                                        )
                                        ,_react["default"].createElement("div",{
                                                id: "editRecap",
                                                className: "menu-item",
                                                onClick: () => {modalScriptFunction.editRecapMenu()}
                                            }, "Edit Recap"
                                        )
                                    )
                                    ,_react["default"].createElement("br", {})
                                    ,_react["default"].createElement("div",{
                                            className: "divTituloModal"
                                        }
                                        ,_react["default"].createElement("h4",{
                                                className: "tituloModal"
                                            }, "6. Recap / Next Steps"
                                        )
                                    )
                                    ,_react["default"].createElement("div",{
                                            id: "recapScriptDiv",
                                        }
                                    )
                                    ,_react["default"].createElement("div",{
                                            id: "editRecapDiv",
                                            className: "hidden"
                                        }
                                    )
                                )
                                ,_react["default"].createElement("div",{
                                        id: "modalScriptClosing",
                                        className: "hidden"
                                    }
                                )
                            )
                        );

                        
                }
            }
        ]
    );
    return ContactosView;
}(_react.Component);



var _default = ContactosView;
exports["default"] = _default;

export default ContactosView;