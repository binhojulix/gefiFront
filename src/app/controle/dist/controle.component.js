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
exports.__esModule = true;
exports.ControleComponent = void 0;
var core_1 = require("@angular/core");
var ControleComponent = /** @class */ (function () {
    function ControleComponent(solicitacaoService, controleService, messageService, pendenciaService, usuarioService, equipamentoService, authenticationService, confirmationService) {
        var _this = this;
        this.solicitacaoService = solicitacaoService;
        this.controleService = controleService;
        this.messageService = messageService;
        this.pendenciaService = pendenciaService;
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
    //associa equipamento ao usuario ou a área
    ControleComponent.prototype.abrirNovoControle = function () {
        this.controle = {};
        this.submitted = false;
        this.controleDialogo = true;
    };
    ControleComponent.prototype.abrirNovaPendencia = function () {
        this.pendencia = {};
        this.submitted = false;
        this.pendenciaDialogo = true;
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
    ControleComponent.prototype.listarControles = function () {
        var _this = this;
        this.controleService.getControles()
            .subscribe(function (data) {
            _this.controles = data;
        }, function (error) {
            console.log(error);
        });
    };
    ControleComponent.prototype.adicionaControle = function () {
        var _this = this;
        this.controleService.addControle(this.controle)
            .subscribe(function (response) {
            _this.controles = _this.controles.filter(function (val) { return val.id
                !== _this.controle.id; });
            _this.controle = {};
        }, function (error) {
            console.log(error);
        });
    };
    ControleComponent.prototype.escondeControle = function () {
        this.controleDialogo = false;
    };
    ControleComponent.prototype.escondePendencia = function () {
        this.pendenciaDialogo = false;
    };
    ControleComponent.prototype.escondeVisualizacao = function () {
        this.visualizarDialogo = false;
    };
    ControleComponent.prototype.registraEResolvePendencia = function (controle) {
        var _this = this;
        var disponivel = controle.disponivel;
        controle.disponivel = !disponivel;
        this.controleService.updateControle(controle)
            .subscribe(function (response) {
            if (disponivel) {
                _this.pendencia.data_pendencia = new Date();
                _this.pendencia.controle = controle;
                _this.pendenciaService.addPendencia(_this.pendencia)
                    .subscribe(function (response) {
                    _this.pendencia = {};
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                _this.pendencia.data_pendencia = new Date();
                _this.pendencia.controle = _this.controle;
                _this.pendenciaService.updatePendencia(_this.pendencia)
                    .subscribe(function (response) {
                    _this.pendencia = {};
                }, function (error) {
                    console.log(error);
                });
            }
            _this.controles = _this.controles.filter(function (val) { return val.id
                !== controle.id; });
            _this.controle = {};
        }, function (error) {
            console.log(error);
        });
    };
    ControleComponent.prototype.visualizar = function (controle) {
        var _this = this;
        this.controle = __assign({}, controle);
        this.visualizarDialogo = true;
        this.solicitacaoService.getSolicitacoesByControle(this.controle.id)
            .subscribe(function (data) {
            _this.controle.solicitacoes = data;
        }, function (error) {
            console.log(error);
        });
        this.pendenciaService.getPendenciasByControle(controle.id)
            .subscribe(function (data) {
            _this.controle.pendencias = data;
        }, function (error) {
            console.log(error);
        });
    };
    ControleComponent.prototype.solicitaEDevolveEquipamento = function (controle) {
        var _this = this;
        var disponivel = controle.disponivel;
        var mensagem = "Solicitar o Equipamento " + controle.equipamento.descricao + " ?";
        if (disponivel) {
            "Devolver o Equipamento " + controle.equipamento.descricao + " ?";
        }
        this.confirmationService.confirm({
            message: mensagem,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-check',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: function () {
                controle.disponivel = !disponivel;
                _this.controleService.updateControle(controle)
                    .subscribe(function (response) {
                    if (disponivel) {
                        _this.solicitacao.usuario = _this.currentUser;
                        _this.solicitacao.data_solicitacao = new Date();
                        _this.solicitacao.controle = controle;
                        _this.solicitacaoService.addSolicitacao(_this.solicitacao)
                            .subscribe(function (response) {
                            _this.solicitacao = {};
                        }, function (error) {
                            console.log(error);
                        });
                    }
                    else {
                        _this.solicitacao.data_devolucao = new Date();
                        _this.solicitacaoService.updateSolicitacao(_this.solicitacao)
                            .subscribe(function (response) {
                            _this.solicitacao = {};
                        }, function (error) {
                            console.log(error);
                        });
                    }
                    _this.controles = _this.controles.filter(function (val) { return val.id
                        !== controle.id; });
                    _this.controle = {};
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    ControleComponent.prototype.findIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.controles.length; i++) {
            if (this.controles[i].id === id) {
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
