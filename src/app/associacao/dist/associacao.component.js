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
exports.AssociacaoComponent = void 0;
var core_1 = require("@angular/core");
var AssociacaoComponent = /** @class */ (function () {
    function AssociacaoComponent(associacaoService, messageService, usuarioService, equipamentoService, confirmationService) {
        this.associacaoService = associacaoService;
        this.messageService = messageService;
        this.usuarioService = usuarioService;
        this.equipamentoService = equipamentoService;
        this.confirmationService = confirmationService;
    }
    AssociacaoComponent.prototype.ngOnInit = function () {
        this.listarAssociacaos();
    };
    AssociacaoComponent.prototype.listarAssociacaos = function () {
        var _this = this;
        this.associacaoService.getAssociacoes()
            .subscribe(function (data) {
            _this.associacoes = data;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    AssociacaoComponent.prototype.abrirNovo = function () {
        this.associacao = {};
        this.submitted = false;
        this.AssociacaoDialogo = true;
        this.listarUsuarios();
        this.listarEquipamentos();
    };
    AssociacaoComponent.prototype.esconderDialogo = function () {
        this.AssociacaoDialogo = false;
        this.submitted = false;
    };
    AssociacaoComponent.prototype.listarUsuarios = function () {
        var _this = this;
        this.usuarioService.getUsuarios()
            .subscribe(function (data) {
            _this.usuarios = data;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    AssociacaoComponent.prototype.listarEquipamentos = function () {
        var _this = this;
        this.equipamentoService.getEquipamentosNaoAssociados()
            .subscribe(function (data) {
            _this.equipamentos = data;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    AssociacaoComponent.prototype.salvarAssociacao = function () {
        var _this = this;
        this.submitted = true;
        this.associacaoService.addAssociacao(this.associacao)
            .subscribe(function (response) {
            console.log(response);
            _this.submitted = true;
        }, function (error) {
            console.log(error);
        });
        this.associacoes.push(this.associacao);
        this.messageService.add({ severity: 'success', summary: 'Successful',
            detail: 'Associacao feita com sucesso', life: 3000 });
        this.usuarios = __spreadArrays(this.usuarios);
        this.AssociacaoDialogo = false;
        this.associacao = {};
    };
    AssociacaoComponent.prototype.editaEquipamento = function (associacao) {
        this.associacao = __assign({}, associacao);
        this.AssociacaoDialogo = true;
    };
    AssociacaoComponent.prototype.devolveAssociacao = function (associacao) {
        var _this = this;
        var id = associacao.id;
        this.confirmationService.confirm({
            message: 'Solicitar o equipamento ' + associacao.equipamento.descricao + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: function () {
                _this.associacaoService.updateAssociacao(associacao)
                    .subscribe(function (response) {
                    console.log(response);
                    _this.associacoes = _this.Associacoes.filter(function (val) { return val.id
                        !== associacao.id; });
                    _this.associacao = {};
                    _this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipamento solicitado', life: 3000 });
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    AssociacaoComponent.prototype.findIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.equipamentos.length; i++) {
            if (this.equipamentos[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };
    AssociacaoComponent = __decorate([
        core_1.Component({
            selector: 'app-associacao',
            templateUrl: './associacao.component.html',
            styleUrls: ['./associacao.component.css']
        })
    ], AssociacaoComponent);
    return AssociacaoComponent;
}());
exports.AssociacaoComponent = AssociacaoComponent;
