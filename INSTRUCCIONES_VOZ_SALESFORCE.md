# Manual de Configuración: Interfaz de Comando de Voz en Vivo (Emampi) & Integración con Salesforce

Este documento detalla paso a paso cómo configurar la interfaz de comando de voz **Emampi** en el dashboard en vivo, habilitar la sincronización bidireccional en tiempo real con **Salesforce Data Cloud**, y visualizar la trazabilidad completa del flujo de datos.

---

## 1. Arquitectura de Integración de Voz de Emampi

La integración de comandos de voz utiliza el motor nativo de reconocimiento de voz del navegador (Web Speech API) canalizado a través del modelo agéntico para mapear intenciones directas. El flujo completo de trazabilidad sigue estos pasos:

1. **Captura de Voz (Cliente)**: El operador activa el micrófono y pronuncia el comando precedido por la palabra clave **"Emampi"** (ej. *"Emampi cambia el departamento a Finanzas"*).
2. **Mapeo de Intención**: El dashboard detecta la palabra clave y extrae la intención (acción + parámetros) generando un objeto estructurado `IntentVector`.
3. **Ingesta en Salesforce Data Cloud**: Se realiza una solicitud HTTP POST asíncrona hacia el endpoint de ingestión de Salesforce.
4. **Procesamiento en Salesforce (Flow Trigger)**: Se dispara un flujo agéntico en Salesforce que valida el balance o actualiza el registro correspondiente (ej. `AWU_Ledger__c`).
5. **Retorno de Confirmación**: Salesforce responde con un `HTTP 200 OK` que actualiza los indicadores en el **Tri-Gateway Hub** y el ticker de telemetría en tiempo real.

```
+-------------+                    +------------------------+                    +--------------------+
|  Dashboard  | --(IntentVector)-->| Salesforce Data Cloud  | --(Flow Trigger)-->| Objeto Salesforce  |
|  (Micro)    |                    | (Streaming Ingestion)  |                    | (AWU_Ledger__c)    |
+-------------+                    +------------------------+                    +--------------------+
       ^                                                                                   |
       |                                                                                   v
       +----------------------(HTTP 200 / Callback Sync)-----------------------------------+
```

---

## 2. Configuración Paso a Paso en Salesforce

Siga estas instrucciones para configurar la contraparte en su organización de Salesforce:

### Paso 2.1: Crear el Objeto Personalizado o Ledger de Control
Para que los datos modificados por voz se almacenen y reconcilien correctamente, asegúrese de tener el objeto de persistencia creado en Salesforce:
1. Vaya a **Setup** > **Object Manager** > **Create** > **Custom Object**.
2. Nombre del Objeto: `AWU_Ledger` (API Name: `AWU_Ledger__c`).
3. Agregue los siguientes campos personalizados:
   * **Métrica / Metric** (`Metric__c`): Texto (80) - ej. *"Revenue"*, *"Balance"*.
   * **Valor / Value** (`Value__c`): Moneda o Texto (80) - ej. *"$54,239"*.
   * **Confianza NLP** (`NLP_Confidence__c`): Porcentaje (3, 2).
   * **Intención de Voz** (`Voice_Intent__c`): Texto Largo de Área (255).

### Paso 2.2: Configurar la API de Ingestión en Salesforce Data Cloud
1. Inicie sesión en su instancia de **Salesforce Data Cloud**.
2. Vaya a **Data Cloud Setup** > **Inbound API Integrations** y cree una nueva conexión API llamada `Emampi_Voice_API`.
3. Defina el esquema del payload JSON que enviará el dashboard:
```json
{
  "client_id": "emampi_dashboard_prod",
  "command": "emampi cambiar departamento a finanzas",
  "intent": "UPDATE_DEPARTMENT",
  "parameters": {
    "target_department": "Finanzas",
    "timestamp": "2026-07-10T10:15:00Z"
  }
}
```
4. Copie el **OAuth Client ID**, **Client Secret** y el **Ingestion URL Endpoint**.

### Paso 2.3: Configurar MuleSoft o el Flow Trigger Agéntico
Para responder inmediatamente al comando de voz y sincronizar el dashboard:
1. En Salesforce Setup, busque **Flows** y seleccione **New Flow**.
2. Elija **Platform Event-Triggered Flow** o cree un **Autolaunched Flow** que se exponga mediante un endpoint REST público.
3. Configure el flujo para:
   * Recibir el comando de voz del endpoint de Data Cloud.
   * Modificar el registro en `AWU_Ledger__c`.
   * Publicar un evento en el bus para notificar de vuelta al dashboard mediante la REST API de Salesforce con el estado de la transacción.

---

## 3. Configuración en el Dashboard en Vivo

Para activar la trazabilidad completa en el dashboard del LWC en vivo:

1. **Habilitar Control de Voz**: 
   * En la barra de control inferior, presione el botón del **Micrófono (MIC)**. El sistema le solicitará permisos de navegador para capturar el flujo de audio.
   * Una vez concedido, el indicador de estado en la barra lateral cambiará de `MICROPHONE STANDBY` a `🔵 ACTIVE / LISTENING`.
2. **Ejecutar un Comando de Voz**:
   * Diga de forma clara: **"Emampi"** seguido de la acción que desea realizar.
   * *Ejemplo 1*: `"Emampi mover abajo"` o `"Emampi abajo"` (Desplazará la pantalla suavemente hacia la sección de analíticas).
   * *Ejemplo 2*: `"Emampi finanzas"` (Actualizará el departamento activo a Finanzas y enviará la confirmación instantánea a Salesforce).
   * *Ejemplo 3*: `"Emampi arriba"` (Desplazará la pantalla hacia el panel superior).
3. **Verificar la Trazabilidad**:
   * Mire la terminal de telemetría **AWU_LEDGER** en la parte superior del dashboard. Verá aparecer una línea de log instantánea indicando el éxito del comando y el porcentaje de coincidencia.
   * Mire el componente **Tri-Gateway Hub** (Sección de Salesforce API). Verá cómo se enciende el puerto de conexión y se incrementa el contador de éxitos en `HTTP 200` y se registra la ingesta en `Data Cloud Ingestion`.

---

## 4. Trazabilidad Completa y Simulación de Fallos

Para garantizar que el dashboard sea resistente a fallos o manipulación de datos, se incluye un mecanismo de **Veto de Seguridad (Safety Veto)** configurable mediante comandos de voz:
* **Activar Veto**: Diga `"Activar Veto"` o `"Veto On"`. Esto forzará una respuesta simulada de error de Salesforce (`HTTP 406 / Veto Estructural`), encendiendo los indicadores rojos de telemetría y bloqueando la modificación de registros críticos de `AWU_Ledger__c` para auditoría preventiva.
* **Desactivar Veto**: Diga `"Desactivar Veto"` o `"Veto Off"`. El sistema restablecerá la conexión y volverá a mostrar el estado saludable `🔵 OK` en tiempo de ejecución.
