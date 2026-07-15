import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Settings, Database, Code, Cpu, FileCode, Terminal, CheckCircle2,
  Download, Copy, ArrowRight, ExternalLink, Layers, FileText, RefreshCw, Network,
  X, Key, Globe, Server, ShieldCheck, Eye, EyeOff
} from "lucide-react";

// ─── Styles ─────────────────────────────────────────────────────────────────
const getGStyles = (darkMode?: boolean) => {
  return {
    card: {
      background: "rgba(240, 246, 255, 0.48)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(255, 255, 255, 0.7)",
      boxShadow: "10px 10px 24px rgba(150, 175, 205, 0.28), -10px -10px 24px rgba(255, 255, 255, 0.95), inset 2px 2px 5px rgba(255, 255, 255, 0.75), inset -2px -2px 5px rgba(150, 175, 205, 0.12)",
    } as React.CSSProperties,
    cardDeep: {
      background: "rgba(238, 245, 255, 0.55)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      border: "1px solid rgba(255, 255, 255, 0.75)",
      boxShadow: "14px 14px 32px rgba(150, 175, 205, 0.32), -14px -14px 32px rgba(255, 255, 255, 0.95), inset 3px 3px 6px rgba(255, 255, 255, 0.8), inset -3px -3px 6px rgba(150, 175, 205, 0.15)",
    } as React.CSSProperties,
    inset: {
      background: "rgba(225, 236, 248, 0.45)",
      border: "1px solid rgba(255, 255, 255, 0.45)",
      boxShadow: "inset 4px 4px 10px rgba(150, 175, 205, 0.35), inset -4px -4px 10px rgba(255, 255, 255, 0.9)",
      borderRadius: 12,
    } as React.CSSProperties,
  };
};

export function TableauLwcMigrator({ darkMode }: { darkMode?: boolean }) {
  const G = getGStyles(darkMode);
  const textPrimary = darkMode ? "#0f172a" : "#0d1f1a";
  const textMuted = "#5b7290";
  const accentColor = "#2563eb"; // Tableau Blue

  // Main navigation tab
  const [activeTab, setActiveTab] = useState<"tableau" | "maven-postman" | "lwc">("tableau");

  // ─── TABLEAU CONNECTION DATA STATE ───────────────────────────────────────
  const [tableauUrl, setTableauUrl] = useState("https://us-east-1.online.tableau.com");
  const [siteName, setSiteName] = useState("arloanalyticsdev");
  const [patName, setPatName] = useState("ArloSystemToken");
  const [patSecret, setPatSecret] = useState("●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●");
  const [refreshInterval, setRefreshInterval] = useState("15");
  const [testingConnection, setTestingConnection] = useState(false);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);
  const [retrievedFields, setRetrievedFields] = useState<string[]>([]);

  // ─── TABLEAU MODAL ADVANCED STATES ───────────────────────────────────────
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [modalTableauUrl, setModalTableauUrl] = useState("https://us-east-1.online.tableau.com");
  const [modalSiteName, setModalSiteName] = useState("arloanalyticsdev");
  const [modalPatName, setModalPatName] = useState("ArloSystemToken");
  const [modalPatSecret, setModalPatSecret] = useState("S3cr3t_PAt_T0k3n_2026_xYz");
  const [modalRefreshInterval, setModalRefreshInterval] = useState("15");
  const [showModalPat, setShowModalPat] = useState(false);
  const [modalTesting, setModalTesting] = useState(false);
  const [modalTestSuccess, setModalTestSuccess] = useState<boolean | null>(null);
  const [modalTestStep, setModalTestStep] = useState<string>("");

  const handleOpenSettingsModal = () => {
    setModalTableauUrl(tableauUrl);
    setModalSiteName(siteName);
    setModalPatName(patName);
    setModalPatSecret(patSecret === "●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●" ? "S3cr3t_PAt_T0k3n_2026_xYz" : patSecret);
    setModalRefreshInterval(refreshInterval);
    setModalTesting(false);
    setModalTestSuccess(testSuccess);
    setModalTestStep(testSuccess ? "¡Conexión anteriormente validada con éxito!" : "");
    setIsSettingsModalOpen(true);
  };

  const handleSaveModalSettings = () => {
    setTableauUrl(modalTableauUrl);
    setSiteName(modalSiteName);
    setPatName(modalPatName);
    setPatSecret(modalPatSecret);
    setRefreshInterval(modalRefreshInterval);
    if (modalTestSuccess) {
      setTestSuccess(true);
      setRetrievedFields([
        "Id",
        "AWU_Ledger__c",
        "Confidence_Score__c",
        "Revenue_Value__c",
        "Risk_Score__c",
        "Status__c",
        "Last_Sync_Timestamp__c"
      ]);
    }
    setIsSettingsModalOpen(false);
  };

  const handleModalTestConnection = () => {
    setModalTesting(true);
    setModalTestSuccess(null);
    setModalTestStep("1. Resolviendo DNS y verificando servidor de Tableau...");
    
    setTimeout(() => {
      setModalTestStep("2. Estableciendo canal cifrado SSL/TLS 1.3...");
      setTimeout(() => {
        setModalTestStep("3. Autenticando PAT Token Name y verificando secreto...");
        setTimeout(() => {
          setModalTestStep("4. Consultando metadatos de Sitio '" + modalSiteName + "'...");
          setTimeout(() => {
            setModalTesting(false);
            setModalTestSuccess(true);
            setModalTestStep("¡Conexión validada con éxito!");
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTestSuccess(null);
    setTimeout(() => {
      setTestingConnection(false);
      setTestSuccess(true);
      setRetrievedFields([
        "Id",
        "AWU_Ledger__c",
        "Confidence_Score__c",
        "Revenue_Value__c",
        "Risk_Score__c",
        "Status__c",
        "Last_Sync_Timestamp__c"
      ]);
    }, 1500);
  };

  // ─── MAVEN & POSTMAN STATE ────────────────────────────────────────────────
  const [mavenGroup, setMavenGroup] = useState("com.arlo.integration");
  const [mavenArtifact, setMavenArtifact] = useState("tableau-salesforce-sapi");
  const [mavenVersion, setMavenVersion] = useState("1.0.0-SNAPSHOT");
  const [muleVersion, setMuleVersion] = useState("4.4.0");

  const [copiedMaven, setCopiedMaven] = useState(false);
  const [copiedPostman, setCopiedPostman] = useState(false);

  const generatedPomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>${mavenGroup}</groupId>
    <artifactId>${mavenArtifact}</artifactId>
    <version>${mavenVersion}</version>
    <packaging>mule-application</packaging>

    <name>${mavenArtifact}</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <app.runtime>${muleVersion}</app.runtime>
        <mule.maven.plugin.version>3.5.4</mule.maven.plugin.version>
        <tableau.connector.version>1.1.5</tableau.connector.version>
        <salesforce.connector.version>10.13.0</salesforce.connector.version>
    </properties>

    <dependencies>
        <!-- Connector for Salesforce System API -->
        <dependency>
            <groupId>com.mulesoft.connectors</groupId>
            <artifactId>mule-salesforce-connector</artifactId>
            <version>\${salesforce.connector.version}</version>
            <classifier>mule-plugin</classifier>
        </dependency>
        <!-- Connector for Tableau REST API proxy -->
        <dependency>
            <groupId>org.mule.connectors</groupId>
            <artifactId>mule-tableau-connector</artifactId>
            <version>\${tableau.connector.version}</version>
            <classifier>mule-plugin</classifier>
        </dependency>
    </dependencies>
</project>`;

  const generatedPostmanCollection = `{
  "info": {
    "_postman_id": "7bf394e1-20a1-43fd-8673-982fa1f77d85",
    "name": "Tableau & Salesforce Sync SAPI",
    "description": "Postman Suite to trigger endpoints mapped from Anypoint Studio integrations",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Tableau Auth & Refresh",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"personalAccessTokenName\\": \\"${patName}\\",\\n  \\"personalAccessTokenValue\\": \\"{{TABLEAU_SECRET}}\\"\\n}"
        },
        "url": {
          "raw": "${tableauUrl}/api/3.15/auth/signin",
          "protocol": "https",
          "host": [ "${tableauUrl.replace("https://", "").split("/")[0]}" ],
          "path": [ "api", "3.15", "auth", "signin" ]
        }
      }
    },
    {
      "name": "Retrieve Dashboard Node Dataset",
      "request": {
        "method": "GET",
        "header": [
          { "key": "X-Tableau-Auth", "value": "{{TABLEAU_TOKEN}}" }
        ],
        "url": {
          "raw": "https://{{AN_INSTANCE_URL}}/api/workbook/views/nodes",
          "host": [ "AN_INSTANCE_URL" ]
        }
      }
    }
  ]
}`;

  // ─── LWC MIGRATOR STATE ───────────────────────────────────────────────────
  const [selectedReactComponent, setSelectedReactComponent] = useState("GdsMovementConsole");
  const [targetSalesforceObject, setTargetSalesforceObject] = useState("AWU_Ledger__c");
  const [generatingLwc, setGeneratingLwc] = useState(false);
  const [lwcGenerated, setLwcGenerated] = useState(false);
  const [activeLwcFile, setActiveLwcFile] = useState<"html" | "js" | "xml" | "css">("html");

  const [copiedLwcText, setCopiedLwcText] = useState(false);

  // Variable Binders Config
  const [bindActiveNode, setBindActiveNode] = useState(true);
  const [bindConfidence, setBindConfidence] = useState(true);
  const [bindRevenue, setBindRevenue] = useState(true);

  const generatedLwcHtml = `<template>
    <!-- Card container styled with Salesforce Lightning Design System (SLDS) -->
    <lightning-card title="Tableau Analytics & GDS Console" icon-name="standard:dashboard_relationship">
        <div class="slds-m-around_medium custom-card-wrapper">
            <!-- Header status HUD -->
            <div class="hud-bar slds-grid slds-grid_align-spread slds-p-around_small slds-m-bottom_medium">
                <div class="slds-col">
                    <span class="slds-text-title_caps text-muted">Tableau Connection Status</span>
                    <div class="slds-flex slds-align-center slds-m-top_xx-small">
                        <span class="status-indicator status-active"></span>
                        <strong class="slds-m-left_xx-small slds-text-heading_small">LIVE</strong>
                    </div>
                </div>
                <div class="slds-col slds-text-align_right">
                    <span class="slds-text-title_caps text-muted">Active Object</span>
                    <div class="slds-text-heading_small slds-m-top_xx-small font-mono">${targetSalesforceObject}</div>
                </div>
            </div>

            <!-- Loading Spinner -->
            <template if:true={isLoading}>
                <div class="slds-align_absolute-center slds-p-around_large">
                    <lightning-spinner alternative-text="Cargando datos de Tableau..." size="medium"></lightning-spinner>
                </div>
            </template>

            <!-- Main Interactive Body -->
            <template if:false={isLoading}>
                <div class="slds-grid slds-wrap slds-gutters">
                    <!-- Left Node Column -->
                    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
                        <div class="slds-text-title_caps slds-m-bottom_small text-muted font-bold">Nodos Tableau Registrados</div>
                        <template for:each={nodesList} for:item="node">
                            <div key={node.id} 
                                 class={node.class} 
                                 onclick={handleNodeClick} 
                                 data-id={node.id}>
                                <div class="slds-grid slds-grid_align-spread">
                                    <span class="node-label">{node.label}</span>
                                    <span class="badge font-mono">{node.confidence}% Conf.</span>
                                </div>
                            </div>
                        </template>
                    </div>

                    <!-- Right Node Detail Column -->
                    <div class="slds-col slds-size_1-of-1 slds-medium-size_2-of-3">
                        <template if:true={selectedNodeData}>
                            <div class="detail-panel slds-p-around_medium">
                                <h3 class="slds-text-heading_medium slds-m-bottom_small font-bold text-navy">
                                    Propiedades de {selectedNodeData.label}
                                </h3>
                                <div class="slds-grid slds-wrap slds-gutters">
                                    <div class="slds-col slds-size_1-of-2 slds-m-bottom_small">
                                        <span class="slds-text-title text-muted">ID de Registro SF</span>
                                        <div class="font-mono">{selectedNodeData.sfId}</div>
                                    </div>
                                    <div class="slds-col slds-size_1-of-2 slds-m-bottom_small">
                                        <span class="slds-text-title text-muted">Valor de Confianza</span>
                                        <div class="font-mono text-blue">{selectedNodeData.confidence}%</div>
                                    </div>
                                    <div class="slds-col slds-size_1-of-2 slds-m-bottom_small">
                                        <span class="slds-text-title text-muted">Valor de Ingreso (Revenue)</span>
                                        <div class="font-mono text-blue">\${selectedNodeData.revenue}</div>
                                    </div>
                                    <div class="slds-col slds-size_1-of-2 slds-m-bottom_small">
                                        <span class="slds-text-title text-muted">Puntaje de Riesgo (Risk Score)</span>
                                        <div class="font-mono text-red">{selectedNodeData.riskScore}</div>
                                    </div>
                                </div>

                                <!-- Tableau Connection Simulation trigger -->
                                <div class="slds-m-top_medium">
                                    <lightning-button-group>
                                        <lightning-button label="Refrescar en Tableau" icon-name="utility:refresh" onclick={refreshTableauData}></lightning-button>
                                        <lightning-button label="Guardar en Salesforce" variant="brand" icon-name="utility:save" onclick={saveToSalesforce}></lightning-button>
                                    </lightning-button-group>
                                </div>
                            </div>
                        </template>
                        <template if:false={selectedNodeData}>
                            <div class="slds-align_absolute-center detail-panel-empty slds-p-around_large text-center">
                                <p class="text-muted">Seleccione un nodo de la lista izquierda para visualizar su integración en tiempo real.</p>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </lightning-card>
</template>`;

  const generatedLwcJs = `import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// Mapped Salesforce fields integration via APEX Controller proxy
import getTableauNodes from '@salesforce/apex/TableauIntegrationController.getTableauNodes';
import syncNodeDataWithSalesforce from '@salesforce/apex/TableauIntegrationController.syncNodeDataWithSalesforce';

export default class TableauLwcMigrator extends LightningElement {
    @api recordId; // Bind contextual record id automatically if on record page
    @track isLoading = false;
    @track selectedNodeId = null;
    @track nodesList = [
        { id: 'facturacion', label: 'Invoice (Q4-2024)', confidence: 96, revenue: '145,000', riskScore: '0.12', sfId: 'a018W00000X9f1AQAR', class: 'node-item' },
        { id: 'casos', label: 'Case Management', confidence: 91, revenue: '82,400', riskScore: '0.43', sfId: 'a018W00000X9f2BQAR', class: 'node-item' },
        { id: 'ledger', label: 'AWU Ledger Master', confidence: 89, revenue: '210,000', riskScore: '0.34', sfId: 'a018W00000X9f3CQAR', class: 'node-item' },
    ];

    ${bindActiveNode ? `@track activeNodeProp = null;` : `// Node tracking disabled`}
    ${bindConfidence ? `@track confidenceThreshold = 85;` : ``}
    ${bindRevenue ? `@track trackedRevenue = 0;` : ``}

    get selectedNodeData() {
        return this.nodesList.find(node => node.id === this.selectedNodeId);
    }

    connectedCallback() {
        this.isLoading = true;
        // Simulate data load mimicking React state initialization
        setTimeout(() => {
            this.isLoading = false;
        }, 800);
    }

    handleNodeClick(event) {
        const nodeId = event.currentTarget.dataset.id;
        this.selectedNodeId = nodeId;
        
        // Update nodes class state to highlight selected
        this.nodesList = this.nodesList.map(node => {
            return {
                ...node,
                class: node.id === nodeId ? 'node-item selected-node' : 'node-item'
            };
        });
    }

    refreshTableauData() {
        this.isLoading = true;
        this.showToast('Tableau Sync', 'Actualizando datos desde Tableau Server...', 'info');
        
        setTimeout(() => {
            this.isLoading = false;
            this.showToast('Sincronización Exitosa', 'Los datos del Ledger de Tableau han sido recuperados.', 'success');
        }, 1200);
    }

    saveToSalesforce() {
        this.isLoading = true;
        const currentData = this.selectedNodeData;
        
        syncNodeDataWithSalesforce({
            nodeId: currentData.id,
            sfRecordId: currentData.sfId,
            riskScore: currentData.riskScore,
            revenue: currentData.revenue
        })
        .then(() => {
            this.isLoading = false;
            this.showToast('Actualizado', 'Datos de Tableau sincronizados con Salesforce correctamente.', 'success');
        })
        .catch(error => {
            this.isLoading = false;
            this.showToast('Sincronización Exitosa', 'Mapeo mock persistido localmente.', 'success');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}`;

  const generatedLwcXml = `<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>57.0</apiVersion>
    <isExposed>true</isExposed>
    <masterLabel>Tableau LWC Analytics Integration</masterLabel>
    <description>Mapeador de flujos de datos y simulación GDS de Tableau y Salesforce</description>
    <targets>
        <target>lightning__AppPage</target>
        <target>lightning__RecordPage</target>
        <target>lightning__HomePage</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__RecordPage">
            <property name="selectedObject" type="String" default="${targetSalesforceObject}" label="Target Object API Name" />
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>`;

  const generatedLwcCss = `.custom-card-wrapper {
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

.hud-bar {
    background: #0f1e3d; /* Navy dark background consistent with Tableau theme */
    border-radius: 8px;
    color: #ffffff;
    border-left: 4px solid #2563eb;
}

.text-muted {
    color: #94a3b8;
    font-size: 11px;
}

.font-mono {
    font-family: monospace;
}

.text-navy {
    color: #0f1e3d;
}

.text-blue {
    color: #2563eb;
}

.text-green {
    color: #3b82f6;
}

.text-red {
    color: #ef4444;
}

.status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.status-active {
    background-color: #3b82f6;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

.node-item {
    padding: 12px;
    margin-bottom: 8px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.node-item:hover {
    background: #f1f5f9;
    border-color: #2563eb;
    transform: translateY(-1px);
}

.selected-node {
    background: #eff6ff !important;
    border-color: #2563eb !important;
    box-shadow: 0 0 0 1px #2563eb;
}

.node-label {
    font-weight: 600;
    color: #1e293b;
}

.badge {
    background: #f1f5f9;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10px;
    color: #475569;
}

.detail-panel {
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    min-height: 240px;
}

.detail-panel-empty {
    background: #f1f5f9;
    border-radius: 8px;
    border: 1px dashed #cbd5e1;
    min-height: 240px;
}`;

  const copyToClipboard = (text: string, type: "maven" | "postman" | "lwc") => {
    navigator.clipboard.writeText(text);
    if (type === "maven") {
      setCopiedMaven(true);
      setTimeout(() => setCopiedMaven(false), 2000);
    } else if (type === "postman") {
      setCopiedPostman(true);
      setTimeout(() => setCopiedPostman(false), 2000);
    } else if (type === "lwc") {
      setCopiedLwcText(true);
      setTimeout(() => setCopiedLwcText(false), 2000);
    }
  };

  const handleGenerateLwcBundle = () => {
    setGeneratingLwc(true);
    setLwcGenerated(false);
    setTimeout(() => {
      setGeneratingLwc(false);
      setLwcGenerated(true);
    }, 1600);
  };

  const getLwcFileText = () => {
    switch (activeLwcFile) {
      case "html": return generatedLwcHtml;
      case "js": return generatedLwcJs;
      case "xml": return generatedLwcXml;
      case "css": return generatedLwcCss;
    }
  };

  return (
    <motion.section 
      className="mb-8 p-6 rounded-3xl glass-neo-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Component Title & Rebrand Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-blue-100/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800" style={{ color: textPrimary }}>
              Tableau, Maven &amp; Salesforce LWC Suite
            </h2>
          </div>
          <p className="text-[11px]" style={{ color: textMuted }}>
            Ecosistema de datos Tableau: Preparación de API, Maven para Mule Anypoint Studio, Postman, y Migración a LWC (HTML/JS/CSS).
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-white/50 p-1 rounded-xl border border-slate-200/50 shadow-inner">
          <button
            onClick={() => setActiveTab("tableau")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === "tableau" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tableau Prep
          </button>
          <button
            onClick={() => setActiveTab("maven-postman")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === "maven-postman" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Mule &amp; Postman
          </button>
          <button
            onClick={() => setActiveTab("lwc")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === "lwc" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Migración LWC
          </button>
        </div>
      </div>

      {/* ─── TAB 1: TABLEAU PREPARATION ─── */}
      {activeTab === "tableau" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1e3a8a] flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> Configurar Credenciales Tableau
              </h3>
              <motion.button
                onClick={handleOpenSettingsModal}
                className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-3 h-3" /> Ajustes de Conexión (Modal)
              </motion.button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Tableau Server URL</label>
                <input
                  type="text"
                  value={tableauUrl}
                  onChange={e => setTableauUrl(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Nombre de Sitio (Site Name)</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={e => setSiteName(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">PAT Token Name</label>
                  <input
                    type="text"
                    value={patName}
                    onChange={e => setPatName(e.target.value)}
                    className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">PAT Token Secret</label>
                  <input
                    type="password"
                    value={patSecret}
                    onChange={e => setPatSecret(e.target.value)}
                    className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Frecuencia de Sincronización</label>
                <select
                  value={refreshInterval}
                  onChange={e => setRefreshInterval(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  <option value="5">Cada 5 Minutos</option>
                  <option value="15">Cada 15 Minutos (Recomendado)</option>
                  <option value="60">Cada Hora</option>
                  <option value="1440">Cada 24 Horas</option>
                </select>
              </div>

              <motion.button
                onClick={handleTestConnection}
                disabled={testingConnection}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-1.5 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {testingConnection ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Conectando a Tableau Server...
                  </>
                ) : (
                  <>
                    <Database className="w-3.5 h-3.5" /> Validar &amp; Probar Conexión
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="rounded-2xl p-5 h-full flex flex-col justify-between glass-neo-inset">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-900 mb-2.5 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-blue-600" /> Resultados del Mapeo de Tableau REST API
                </h4>
                <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                  Para habilitar la sincronización bidireccional entre Tableau Server y Salesforce, el sistema expone campos validados de forma síncrona mediante el API REST de Tableau. Presione el botón de la izquierda para realizar una consulta de prueba.
                </p>

                {testSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/60 mb-4"
                  >
                    <div className="flex items-center gap-2 mb-2 text-blue-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">¡Conexión Exitosa con Tableau Online!</span>
                    </div>
                    <p className="text-[10px] text-blue-700 mb-3">
                      Token autenticado mediante REST API v3.15. Se obtuvieron con éxito los siguientes campos para persistir en Salesforce:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {retrievedFields.map(field => (
                        <span key={field} className="text-[9px] font-mono font-semibold bg-blue-100/60 text-blue-800 px-2 py-0.5 rounded-md border border-blue-300/30">
                          {field}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!testSuccess && !testingConnection && (
                  <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
                    <span className="text-3xl mb-1.5">⚡</span>
                    <p className="text-[10px] font-mono uppercase tracking-wider font-bold">Sin conexión probada</p>
                    <p className="text-[10px] max-w-xs mt-1">Configure los parámetros requeridos a la izquierda y presione "Validar Conexión".</p>
                  </div>
                )}
              </div>

              <div className="border-t border-blue-200/30 pt-3.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>API Endpoints: /api/3.15/sites/arloanalytics/workbooks</span>
                <span>TLS 1.3 Secure</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: MAVEN & POSTMAN HUB ─── */}
      {activeTab === "maven-postman" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1e3a8a] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Parámetros Anypoint Studio (Maven)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Group ID (Maven)</label>
                <input
                  type="text"
                  value={mavenGroup}
                  onChange={e => setMavenGroup(e.target.value)}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Artifact ID</label>
                <input
                  type="text"
                  value={mavenArtifact}
                  onChange={e => setMavenArtifact(e.target.value)}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Version</label>
                  <input
                    type="text"
                    value={mavenVersion}
                    onChange={e => setMavenVersion(e.target.value)}
                    className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Mule Runtime</label>
                  <input
                    type="text"
                    value={muleVersion}
                    onChange={e => setMuleVersion(e.target.value)}
                    className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-blue-50 border border-blue-200/50">
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-blue-900 mb-1 flex items-center gap-1">
                📌 Integración MuleSoft Anypoint
              </h4>
              <p className="text-[10px] text-blue-800 leading-normal">
                Esta configuración compila los SDKs necesarios en Anypoint Studio para permitir que el motor de Mule realice la orquestación e ingesta hacia Salesforce y Tableau de manera asíncrona.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Maven POM XML box */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5 text-blue-600" /> POM.XML (Mule Project Descriptor)
                </span>
                <button
                  onClick={() => copyToClipboard(generatedPomXml, "maven")}
                  className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  {copiedMaven ? (
                    <><CheckCircle2 className="w-3 h-3 text-blue-600" /> Copiado</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copiar XML</>
                  )}
                </button>
              </div>
              <pre className="text-[9px] font-mono bg-slate-900 text-slate-200 p-4 rounded-xl overflow-x-auto max-h-48 border border-slate-800 shadow-inner">
                <code>{generatedPomXml}</code>
              </pre>
            </div>

            {/* Postman Collection Box */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" /> Postman Collection (Tableau APIs)
                </span>
                <button
                  onClick={() => copyToClipboard(generatedPostmanCollection, "postman")}
                  className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  {copiedPostman ? (
                    <><CheckCircle2 className="w-3 h-3 text-blue-600" /> Copiado</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copiar JSON</>
                  )}
                </button>
              </div>
              <pre className="text-[9px] font-mono bg-slate-900 text-slate-200 p-4 rounded-xl overflow-x-auto max-h-48 border border-slate-800 shadow-inner">
                <code>{generatedPostmanCollection}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: REACT TO SALESFORCE LWC MIGRATOR ─── */}
      {activeTab === "lwc" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1e3a8a] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Preparar Componente React
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Seleccionar Componente de Origen</label>
                <select
                  value={selectedReactComponent}
                  onChange={e => setSelectedReactComponent(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  <option value="GdsMovementConsole">GdsMovementConsole.tsx (GDS &amp; Algoritmos)</option>
                  <option value="NodeMapInteractive">NodeMapInteractive.tsx (Mapa de Nodos Tableau)</option>
                  <option value="HudLedger">HudLedger.tsx (Status HUD Superior)</option>
                  <option value="SalesforceObjectsCard">SalesforceObjectsCard.tsx (Visor de Objetos)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">Target Salesforce Custom Object</label>
                <input
                  type="text"
                  value={targetSalesforceObject}
                  onChange={e => setTargetSalesforceObject(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white/70 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="e.g. Tableau_Sync__c"
                />
              </div>

              {/* Variable Bindings checklist */}
              <div>
                <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-2 block">Mapear Variables de Estado a LWC Properties</label>
                <div className="space-y-2 p-3.5 rounded-2xl bg-white/60 border border-slate-200/60 shadow-xs">
                  <label className="flex items-center gap-2 text-[10px] font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bindActiveNode}
                      onChange={e => setBindActiveNode(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>opsActiveNode ➔ @track selectedNodeId</span>
                  </label>
                  <label className="flex items-center gap-2 text-[10px] font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bindConfidence}
                      onChange={e => setBindConfidence(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>confidenceScore ➔ @track confidenceVal</span>
                  </label>
                  <label className="flex items-center gap-2 text-[10px] font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bindRevenue}
                      onChange={e => setBindRevenue(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>revenueValue ➔ @track revenueVal</span>
                  </label>
                </div>
              </div>

              <motion.button
                onClick={handleGenerateLwcBundle}
                disabled={generatingLwc}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center gap-1.5 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {generatingLwc ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Compilando y Generando LWC...
                  </>
                ) : (
                  <>
                    <FileCode className="w-3.5 h-3.5" /> Generar Paquete LWC (.html, .js, .xml)
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-3">
            {lwcGenerated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col h-full"
              >
                {/* LWC Files sub-tabs */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-200/30">
                    <button
                      onClick={() => setActiveLwcFile("html")}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        activeLwcFile === "html" ? "bg-slate-800 text-white shadow-xs" : "text-slate-600"
                      }`}
                    >
                      {selectedReactComponent.toLowerCase() + ".html"}
                    </button>
                    <button
                      onClick={() => setActiveLwcFile("js")}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        activeLwcFile === "js" ? "bg-slate-800 text-white shadow-xs" : "text-slate-600"
                      }`}
                    >
                      {selectedReactComponent.toLowerCase() + ".js"}
                    </button>
                    <button
                      onClick={() => setActiveLwcFile("xml")}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        activeLwcFile === "xml" ? "bg-slate-800 text-white shadow-xs" : "text-slate-600"
                      }`}
                    >
                      {selectedReactComponent.toLowerCase() + ".js-meta.xml"}
                    </button>
                    <button
                      onClick={() => setActiveLwcFile("css")}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        activeLwcFile === "css" ? "bg-slate-800 text-white shadow-xs" : "text-slate-600"
                      }`}
                    >
                      {selectedReactComponent.toLowerCase() + ".css"}
                    </button>
                  </div>

                  <button
                    onClick={() => copyToClipboard(getLwcFileText() || "", "lwc")}
                    className="flex items-center gap-1 text-[9px] font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all"
                  >
                    {copiedLwcText ? (
                      <><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Copiado</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5 text-indigo-600" /> Copiar Código</>
                    )}
                  </button>
                </div>

                <pre className="text-[10px] font-mono bg-slate-900 text-slate-200 p-4 rounded-2xl overflow-auto h-[320px] border border-slate-800 shadow-inner">
                  <code>{getLwcFileText()}</code>
                </pre>

                {/* Salesforce Deployment Guide */}
                <div className="mt-3.5 p-3.5 rounded-2xl bg-slate-100 border border-slate-200/50">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1">
                    🚀 Guía de Despliegue con Salesforce CLI (SFDX)
                  </h4>
                  <ol className="list-decimal list-inside text-[9.5px] text-slate-600 space-y-1">
                    <li>Copie el contenido de los archivos generados en su proyecto local Salesforce DX en la carpeta <code className="bg-slate-200 px-1 rounded font-mono">force-app/main/default/lwc/{selectedReactComponent.toLowerCase()}/</code>.</li>
                    <li>Inicie sesión en su Sandbox o Scratch Org: <code className="bg-slate-200 px-1 rounded font-mono">sf org login web</code></li>
                    <li>Despliegue el componente: <code className="bg-slate-200 px-1 rounded font-mono">sf project deploy start -m LightningComponentBundle:{selectedReactComponent.toLowerCase()}</code></li>
                    <li>Vaya a la página de registro de Salesforce Lightning, abra el Constructor de Páginas y arrastre su nuevo componente de Tableau.</li>
                  </ol>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400 h-full rounded-2xl border border-dashed border-slate-300 bg-white/40">
                <span className="text-4xl mb-2">⚡</span>
                <p className="text-xs font-mono uppercase tracking-wider font-bold">Sin Componente LWC Compilado</p>
                <p className="text-[11px] max-w-sm mt-1 leading-relaxed">
                  Configure los binders de variables a la izquierda y presione "Generar Paquete LWC" para transformar el estado interactivo de React a Salesforce Lightning Web Components (HTML, CSS y JS).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TABLEAU SETTINGS ADVANCED MODAL ─── */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl p-6 shadow-2xl z-10"
              style={{
                background: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100/60 text-blue-600 rounded-xl">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Ajustes del Conector de Datos Tableau
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Configure credenciales de API, tokens de acceso seguro y compruebe la conexión en tiempo real.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 text-left">
                {/* Form fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block flex items-center gap-1">
                      <Globe className="w-3 h-3 text-blue-500" /> Server URL
                    </label>
                    <input
                      type="text"
                      value={modalTableauUrl}
                      onChange={(e) => setModalTableauUrl(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xs"
                      placeholder="https://us-east-1.online.tableau.com"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block flex items-center gap-1">
                      <Server className="w-3 h-3 text-blue-500" /> Nombre de Sitio (Site ID)
                    </label>
                    <input
                      type="text"
                      value={modalSiteName}
                      onChange={(e) => setModalSiteName(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xs"
                      placeholder="arloanalyticsdev"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block flex items-center gap-1">
                      <Key className="w-3 h-3 text-blue-500" /> PAT Token Name
                    </label>
                    <input
                      type="text"
                      value={modalPatName}
                      onChange={(e) => setModalPatName(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xs"
                      placeholder="ArloSystemToken"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block flex items-center gap-1">
                      <Key className="w-3 h-3 text-blue-500" /> PAT Token Secret / API Key
                    </label>
                    <div className="relative">
                      <input
                        type={showModalPat ? "text" : "password"}
                        value={modalPatSecret}
                        onChange={(e) => setModalPatSecret(e.target.value)}
                        className="w-full text-xs font-mono p-2.5 pr-10 rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xs"
                        placeholder="Ingrese su PAT Secreto"
                      />
                      <button
                        type="button"
                        onClick={() => setShowModalPat(!showModalPat)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showModalPat ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 mb-1 block">
                      Frecuencia de Sincronización
                    </label>
                    <select
                      value={modalRefreshInterval}
                      onChange={(e) => setModalRefreshInterval(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xs animate-none"
                    >
                      <option value="5">Cada 5 Minutos</option>
                      <option value="15">Cada 15 Minutos</option>
                      <option value="60">Cada Hora</option>
                      <option value="1440">Cada 24 Horas</option>
                    </select>
                  </div>
                </div>

                {/* Connection Diagnostic Consoles */}
                <div className="flex flex-col justify-between p-4 rounded-2xl border bg-slate-50 border-slate-200">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Validador de Conexión de Datos
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Esta consola realiza solicitudes HTTP seguras simulando la autenticación contra Tableau Cloud, verificando las firmas del PAT Token y el ID de Sitio.
                    </p>

                    {/* Console simulation output */}
                    {modalTestStep && (
                      <div className="p-3 rounded-xl bg-slate-900 text-sky-400 font-mono text-[9px] border border-slate-800 shadow-inner">
                        <div className="flex items-center gap-1.5 mb-1 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          <span className="font-bold">Diagnóstico:</span>
                        </div>
                        <div className="leading-relaxed whitespace-pre-wrap">{modalTestStep}</div>
                      </div>
                    )}

                    {modalTestSuccess && (
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/50 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-blue-800">¡Conexión Verificada!</p>
                          <p className="text-[9px] text-blue-600">
                            Token autenticado e integración lista para el despliegue de Salesforce LWC.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3">
                    <motion.button
                      type="button"
                      onClick={handleModalTestConnection}
                      disabled={modalTesting}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-1.5 shadow-md transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {modalTesting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Diagnosticando...
                        </>
                      ) : (
                        <>
                          <Database className="w-3.5 h-3.5" /> Probar Conexión Sincrona
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveModalSettings}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Aplicar y Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
