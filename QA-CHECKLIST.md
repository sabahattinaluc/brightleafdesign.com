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

## Review Output Template

```
## QA Report — [Project Name]

**Review Date:** YYYY-MM-DD
**Reviewer:** [Agent/User]
**URL:** [Deployed URL]

### Results
| Category | Status | Score |
|----------|--------|-------|
| Functionality | PASS/FAIL | X/10 |
| Responsive | PASS/FAIL | X/10 |
| Performance | PASS/FAIL | X/10 |
| Accessibility | PASS/FAIL | X/10 |
| Browser | PASS/FAIL | X/10 |
| SEO | PASS/FAIL | X/10 |
| Security | PASS/FAIL | X/10 |
| Code | PASS/FAIL | X/10 |
| Assets | PASS/FAIL | X/10 |
| Visual | PASS/FAIL | X/10 |

### Issues Found

#### 🔴 Critical
- [Issue description and fix recommendation]

#### 🟠 High
- [Issue description and fix recommendation]

#### 🟡 Medium
- [Issue description and fix recommendation]

#### 🟢 Low
- [Issue description and fix recommendation]

### Summary
Overall score: X/100
Ready for deployment: YES/NO
```
