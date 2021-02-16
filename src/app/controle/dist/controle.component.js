"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ControleComponent = void 0;
var core_1 = require("@angular/core");
var ControleComponent = /** @class */ (function () {
    function ControleComponent(controleService, messageService, usuarioService, equipamentoService, authenticationService, confirmationService) {
        var _this = this;
        this.controleService = controleService;
        this.messageService = messageService;
        this.usuarioService = usuarioService;
        this.equipamentoService = equipamentoService;
        this.authenticationService = authenticationService;
        this.confirmationService = confirmationService;
        this.authenticationService
            .currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    ControleComponent.prototype.ngOnInit = function () {
        this.listarControles();
    };
    ControleComponent.prototype.listarControles = function () {
        var _this = this;
        this.controleService.getControles()
            .subscribe(function (data) {
            _this.controles = data;
        }, function (error) {
            console.log(error);
        });
    };
    ControleComponent.prototype.abrirNovo = function () {
        this.controle = {};
        this.submitted = false;
        this.controleDialogo = true;
        this.listarUsuarios();
        this.listarEquipamentos();
    };
    ControleComponent.prototype.esconderDialogo = function () {
        this.controleDialogo = false;
        this.submitted = false;
    };
    ControleComponent.prototype.listarUsuarios = function () {
        var _this = this;
        this.usuarioService.getUsuarios()
            .subscribe(function (data) {
            _this.usuarios = data;
        }, function (error) {
            console.log(error);
        });
    };
    ControleComponent.prototype.listarEquipamentos = function () {
        var _this = this;
        this.equipamentoService.getEquipamentosNaoAssociados()
            .subscribe(function (data) {
            _this.equipamentos = data;
        }, function (error) {
            console.log(error);
        });
    };
    ControleComponent.prototype.salvarControle = function () {
        var _this = this;
        this.submitted = true;
        this.controleService.addControle(this.controle)
            .subscribe(function (response) {
            console.log(response);
            _this.submitted = true;
        }, function (error) {
            console.log(error);
        });
        this.controles.push(this.controle);
        this.messageService.add({ severity: 'success', summary: 'Successful',
            detail: 'Controle feita com sucesso', life: 3000 });
        this.usuarios = __spreadArrays(this.usuarios);
        this.controleDialogo = false;
        this.controle = {};
    };
    ControleComponent.prototype.editaEquipamento = function (controle) {
        this.controle = __assign({}, controle);
        this.controleDialogo = true;
    };
    ControleComponent.prototype.devolveControle = function (controle) {
        var _this = this;
        var id = controle.id;
        this.confirmationService.confirm({
            message: 'Solicitar o equipamento ' + controle.equipamento.descricao + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: function () {
                _this.controleService.updateControle(controle)
                    .subscribe(function (response) {
                    console.log(response);
                    _this.controles = _this.controles.filter(function (val) { return val.id
                        !== controle.id; });
                    _this.controle = {};
                    _this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipamento solicitado', life: 3000 });
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    ControleComponent.prototype.findIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.equipamentos.length; i++) {
            if (this.equipamentos[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };
    ControleComponent = __decorate([
        core_1.Component({
            selector: 'app-controle',
            templateUrl: './controle.component.html',
            styleUrls: ['./controle.component.css']
        })
    ], ControleComponent);
    return ControleComponent;
}());
exports.ControleComponent = ControleComponent;
