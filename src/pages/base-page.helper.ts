import type {Page} from '@playwright/test'

export const waitForApiResponse = (page: Page, route: string, method: string) =>
	page.waitForResponse(
		(response) =>
			response.url().includes(route) &&
			response.request().method() === method,
	)
export const scrollPlaygroundComposerPanel = (page: Page) =>
	page.evaluate(
		`(() => {
  const list = document.querySelectorAll('.ql-editor');
  const el = list.item(list.length - 1);
  if (!el) return;
  let node = el.parentElement;
  while (node) {
    const oy = getComputedStyle(node).overflowY;
    if (
      (oy === 'auto' || oy === 'scroll' || oy === 'overlay') &&
      node.scrollHeight > node.clientHeight + 2
    ) {
      node.scrollTop = node.scrollHeight;
      break;
    }
    node = node.parentElement;
  }
})()`,
	)
