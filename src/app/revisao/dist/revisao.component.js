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
exports.RevisaoComponent = void 0;
var core_1 = require("@angular/core");
var RevisaoComponent = /** @class */ (function () {
    function RevisaoComponent(revisaoService, messageService, usuarioService, equipamentoService, authenticationService, confirmationService) {
        var _this = this;
        this.revisaoService = revisaoService;
        this.messageService = messageService;
        this.usuarioService = usuarioService;
        this.equipamentoService = equipamentoService;
        this.authenticationService = authenticationService;
        this.confirmationService = confirmationService;
        this.authenticationService
            .currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    RevisaoComponent.prototype.ngOnInit = function () {
        this.listarRevisaos();
    };
    RevisaoComponent.prototype.listarRevisaos = function () {
        var _this = this;
        this.revisaoService.getRevisoes()
            .subscribe(function (data) {
            _this.revisoes = data;
        }, function (error) {
            console.log(error);
        });
    };
    RevisaoComponent.prototype.abrirNovo = function () {
        this.revisao = {};
        this.submitted = false;
        this.revisaoDialogo = true;
        this.listarUsuarios();
        this.listarEquipamentos();
    };
    RevisaoComponent.prototype.esconderDialogo = function () {
        this.revisaoDialogo = false;
        this.submitted = false;
    };
    RevisaoComponent.prototype.listarUsuarios = function () {
        var _this = this;
        this.usuarioService.getUsuarios()
            .subscribe(function (data) {
            _this.usuarios = data;
        }, function (error) {
            console.log(error);
        });
    };
    RevisaoComponent.prototype.listarEquipamentos = function () {
        var _this = this;
        this.equipamentoService.getEquipamentosNaoAssociados()
            .subscribe(function (data) {
            _this.equipamentos = data;
        }, function (error) {
            console.log(error);
        });
    };
    RevisaoComponent.prototype.salvarRevisao = function () {
        var _this = this;
        this.submitted = true;
        this.revisaoService.addRevisao(this.revisao)
            .subscribe(function (response) {
            console.log(response);
            _this.submitted = true;
        }, function (error) {
            console.log(error);
        });
        this.revisoes.push(this.revisao);
        this.messageService.add({ severity: 'success', summary: 'Successful',
            detail: 'Revisao feita com sucesso', life: 3000 });
        this.usuarios = __spreadArrays(this.usuarios);
        this.revisaoDialogo = false;
        this.revisao = {};
    };
    RevisaoComponent.prototype.editaEquipamento = function (Revisao) {
        this.revisao = __assign({}, Revisao);
        this.revisaoDialogo = true;
    };
    RevisaoComponent.prototype.devolveRevisao = function (revisao) {
        var _this = this;
        var id = revisao.id;
        this.confirmationService.confirm({
            message: 'Solicitar o equipamento ' + revisao.equipamento.descricao + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: function () {
                _this.revisaoService.updateRevisao(revisao.id, revisao)
                    .subscribe(function (response) {
                    console.log(response);
                    _this.revisoes = _this.revisoes.filter(function (val) { return val.id
                        !== revisao.id; });
                    _this.revisao = {};
                    _this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipamento solicitado', life: 3000 });
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    RevisaoComponent.prototype.findIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.equipamentos.length; i++) {
            if (this.equipamentos[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };
    RevisaoComponent = __decorate([
        core_1.Component({
            selector: 'app-revisao',
            templateUrl: './revisao.component.html',
            styleUrls: ['./revisao.component.css']
        })
    ], RevisaoComponent);
    return RevisaoComponent;
}());
exports.RevisaoComponent = RevisaoComponent;
