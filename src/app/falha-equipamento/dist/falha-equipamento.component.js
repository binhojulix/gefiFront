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
exports.FalhaEquipamentoComponent = void 0;
var core_1 = require("@angular/core");
var FalhaEquipamentoComponent = /** @class */ (function () {
    function FalhaEquipamentoComponent(controleService, messageService, confirmationService, authenticationService) {
        var _this = this;
        this.controleService = controleService;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.authenticationService = authenticationService;
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    FalhaEquipamentoComponent.prototype.listarEquipamentosDoUsuario = function () {
        var _this = this;
        this.controleService.getControlesDoUsuario()
            .subscribe(function (data) {
            _this.controles = data;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    FalhaEquipamentoComponent.prototype.ngOnInit = function () {
        this.listarEquipamentosDoUsuario();
        console.log("total de equipamentos");
        console.log(this.controles);
    };
    FalhaEquipamentoComponent.prototype.abrirNovo = function () {
        this.controle = {};
        this.submitted = false;
        this.controleDialogo = true;
    };
    FalhaEquipamentoComponent.prototype.atualizaControle = function () {
        var _this = this;
        this.submitted = true;
        this.controleService.updateControle(this.controle)
            .subscribe(function (response) {
            console.log(response);
            _this.submitted = true;
        }, function (error) {
            console.log(error);
        });
        this.controles.push(this.controle);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Status atualizado', life: 3000 });
        this.controles = __spreadArrays(this.controles);
        this.controleDialogo = false;
        this.controle = {};
    };
    FalhaEquipamentoComponent.prototype.validaFalhaDoEquipamento = function (controle) {
        var _this = this;
        var id = controle.id_usuario_equipamento;
        this.confirmationService.confirm({
            message: 'Tem certeza que quer deletar o equipamento ' + controle.equipamento.descricao_equipamento + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: function () {
                _this.controleService.updateControle(controle)
                    .subscribe(function (response) {
                    console.log(response);
                    _this.controles = _this.controles.filter(function (val) { return val.id_usuario_equipamento
                        !== _this.controle.id_usuario_equipamento; });
                    _this.controle = {};
                    _this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipamento deletado', life: 3000 });
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    FalhaEquipamentoComponent.prototype.editaControle = function (controle) {
        this.controle = __assign({}, controle);
        this.controleDialogo = true;
    };
    FalhaEquipamentoComponent.prototype.esconderDialogo = function () {
        this.controleDialogo = false;
        this.submitted = false;
    };
    FalhaEquipamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-falha-equipamento',
            templateUrl: './falha-equipamento.component.html',
            styleUrls: ['./falha-equipamento.component.css']
        })
    ], FalhaEquipamentoComponent);
    return FalhaEquipamentoComponent;
}());
exports.FalhaEquipamentoComponent = FalhaEquipamentoComponent;
