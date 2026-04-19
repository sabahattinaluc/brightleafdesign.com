# QA Agent Checklist — Web Development Review

## Pre-Deployment Quality Assurance

Use this checklist to validate any web project before deployment.

---

## 1. Functionality ✓

- [ ] All navigation links route to correct destinations
- [ ] CTA buttons perform intended actions
- [ ] Forms validate input and submit correctly
- [ ] Modal dialogs open, close, and trap focus
- [ ] Animations play smoothly without jank
- [ ] Error states display appropriate messages
- [ ] Loading states shown for async operations

## 2. Responsive Design ✓

- [ ] No horizontal overflow at any viewport width
- [ ] Mobile: 320px — layout functional
- [ ] Tablet: 768px — layout adapts
- [ ] Desktop: 1024px+ — optimal experience
- [ ] Touch targets minimum 44x44px
- [ ] Images resize without distortion

## 3. Performance ✓

- [ ] Lighthouse Performance score ≥ 80
- [ ] LCP < 2.5 seconds
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Bundle size appropriate for use case
- [ ] Images optimized and lazy-loaded
- [ ] No render-blocking resources

## 4. Accessibility (WCAG 2.1 AA) ✓

- [ ] Semantic HTML structure
- [ ] Single `<h1>` per page
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] All images have `alt` attributes
- [ ] Color contrast ≥ 4.5:1 (normal text)
- [ ] Color contrast ≥ 3:1 (large text)
- [ ] Keyboard navigation functional
- [ ] Focus indicators visible
- [ ] ARIA labels where needed
- [ ] `lang` attribute on `<html>`

## 5. Browser Compatibility ✓

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] No console errors
- [ ] Graceful degradation for older browsers

## 6. SEO ✓

- [ ] Unique `<title>` tag
- [ ] Meta description present
- [ ] Open Graph tags for social sharing
- [ ] Structured heading hierarchy
- [ ] Canonical URL defined
- [ ] Sitemap.xml (if applicable)

## 7. Security ✓

- [ ] HTTPS for all resources
- [ ] No inline sensitive data
- [ ] CSP headers configured
- [ ] Sanitized user inputs
- [ ] No `eval()` or dangerous patterns

## 8. Code Quality ✓

- [ ] HTML validates (W3C)
- [ ] CSS has no conflicts
- [ ] JavaScript has no memory leaks
- [ ] Build completes without errors
- [ ] No dead code

## 9. Assets ✓

- [ ] All images load (HTTP 200)
- [ ] Fonts load with fallbacks
- [ ] Icons render correctly
- [ ] Favicon present
- [ ] 404 resources checked

## 10. Visual Fidelity ✓

- [ ] Matches design system colors
- [ ] Typography matches specs
- [ ] Spacing consistent with design
- [ ] Border radius uniform
- [ ] Shadows/elevation consistent
- [ ] Loading states implemented
- [ ] Empty states designed

---

## Issue Severity Levels

| Level | Description | Blocking? |
|-------|-------------|-----------|
| 🔴 Critical | Functionality broken, security issues | Yes |
| 🟠 High | Major UX issues, accessibility failures | Yes |
| 🟡 Medium | Minor UX issues, visual inconsistencies | No |
| 🟢 Low | Cosmetic issues, minor improvements | No |

---

## QA Report — Bright Leaf Design

**Review Date:** 2026-04-19
**Reviewer:** QA Agent
**URL:** https://sabahattinaluc.github.io/brightleafdesign.com/

### Results
| Category | Status | Score | Notes |
|----------|--------|-------|-------|
| Functionality | 🔴 FAIL | 2/10 | JS not loading - page blank |
| Responsive | ⏳ N/A | - | Cannot test (JS broken) |
| Performance | ⏳ N/A | - | Cannot test (JS broken) |
| Accessibility | ⏳ N/A | - | Cannot test (JS broken) |
| Browser | ⏳ N/A | - | Cannot test (JS broken) |
| SEO | ✅ PASS | 8/10 | Title, meta present |
| Security | ✅ PASS | 9/10 | HTTPS, no sensitive data |
| Code | 🔴 FAIL | 3/10 | Build/deploy config broken |
| Assets | 🔴 FAIL | 0/10 | All assets return 404 |
| Visual | ⏳ N/A | - | Cannot test (JS broken) |

### Issues Found

#### 🔴 Critical

1. **JavaScript Assets 404**
   - `GET https://sabahattinaluc.github.io/brightleafdesign.com/assets/index-*.js` → 404
   - `GET https://sabahattinaluc.github.io/brightleafdesign.com/assets/index-*.css` → 404
   - **Impact:** Page loads HTML shell only, React never mounts
   - **Fix:** GitHub Actions not deploying `dist/` folder correctly

2. **Deployed HTML Points to Source Files**
   - Deployed: `<script type="module" src="/src/main.jsx">`
   - Expected: `<script type="module" src="./assets/index-*.js">`
   - **Impact:** Browser can't load source JSX files (not compiled)
   - **Fix:** Deployment workflow not using built artifacts

3. **GitHub Actions Workflow Failing**
   - Workflow run: `conclusion: failure`
   - **Impact:** Site never deploys correctly
   - **Fix:** Updated workflow to use `upload-pages-artifact` + `deploy-pages`

#### 🟠 High

4. **No Open Graph Tags**
   - Missing `<meta property="og:*">` tags
   - **Impact:** Poor social sharing previews
   - **Fix:** Add OG tags for social media

5. **Missing Favicon**
   - `href="/vite.svg"` — file doesn't exist in dist
   - **Impact:** No favicon displayed
   - **Fix:** Copy favicon to public folder or inline as data URI

#### 🟡 Medium

6. **Bundle Size Not Verified**
   - JS: 336KB (before gzip: 113KB)
   - **Impact:** May be too large for optimal performance
   - **Fix:** Consider code splitting

#### 🟢 Low

7. **Missing Structured Data**
   - No JSON-LD for organization
   - **Impact:** SEO could be improved
   - **Fix:** Add Organization schema

8. **No Error Boundary**
   - React app has no error boundary component
   - **Impact:** Runtime errors show blank page
   - **Fix:** Add ErrorBoundary component

---

### Summary

**Overall score: 22/100**

**Ready for deployment: NO**

**Critical blockers:**
1. Fix GitHub Actions deployment workflow ✅ (COMMITTED)
2. Verify dist folder deploys correctly
3. Test all assets load (HTTP 200)

**Recommended next steps:**
1. Wait for GitHub Actions to rebuild (triggered by workflow commit)
2. Verify at: https://github.com/sabahattinaluc/brightleafdesign.com/actions
3. Test deployed site in browser
4. Address Medium/Low priority items

---

## Automated QA Commands

```bash
# Check HTTP status of deployed site
curl -sI https://sabahattinaluc.github.io/brightleafdesign.com/

# Check assets
curl -sI https://sabahattinaluc.github.io/brightleafdesign.com/assets/index-*.js

# Check HTML content
curl -s https://sabahattinaluc.github.io/brightleafdesign.com/

# Check for 404s
curl -s https://sabahattinaluc.github.io/brightleafdesign.com/ | grep -E "(404|error)" 

# Validate HTML
npx html-validate dist/index.html

# Lighthouse CLI (if installed)
npx lighthouse https://sabahattinaluc.github.io/brightleafdesign.com/ --output html --output-path report.html
```
