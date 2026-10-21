# Roadmap & Backlog Técnico — Gambit

Documento de rastreamento de tarefas, melhorias técnicas, pendências legais e integrações futuras.

---

## 📌 Próximos Passos & Pendências

### 1. Analytics & Consentimento de Cookies (LGPD / Google Consent Mode v2)

* **Status:** Pendente (Aguardando criação da tag do Google Analytics / GTM)
* **Contexto:**
  * Atualmente, o site é puramente estático/institucional e não utiliza cookies de rastreamento de terceiros.
  * Por conformidade e boa experiência (evitar ruído visual desnecessário), o banner de consentimento de cookies **não foi implementado antecipadamente**.
  * A implementação do banner deve ocorrer **em conjunto** com a inclusão da tag de mensuração (GA4 / GTM / Meta Pixel).

* **Plano de Implementação:**
  1. **Tag Analytics:** Obter o Measurement ID do Google Analytics 4 (ex: `G-XXXXXXXXXX`) ou container GTM.
  2. **Banner / Modal de Cookies:**
     * Criar componente de UI discreto e elegante com a identidade visual da Gambit (alinhado ao tema dark/light da landing page).
     * Opções de "Aceitar todos", "Recusar não essenciais" ou "Configurar".
  3. **Google Consent Mode v2:**
     * Definir estado padrão prévio (denied):
       ```javascript
       gtag('consent', 'default', {
         'analytics_storage': 'denied',
         'ad_storage': 'denied',
         'ad_user_data': 'denied',
         'ad_personalization': 'denied'
       });
       ```
     * Disparar atualização para `granted` mediante clique do visitante em "Aceitar".
     * Persistir escolha do usuário no `localStorage` para não reexibir em navegações futuras.
  4. **Página / Modal de Política de Privacidade:**
     * Criar página simplificada explicando coleta de dados e contato para direitos LGPD.

---
