# MCP Server Setup Documentation

## Overview

This workspace is configured with multiple Model Context Protocol (MCP) servers to enhance research and web browsing capabilities for game development.

**Configuration File:** [.mcp.json](../.mcp.json)
**Setup Date:** 2025-10-14
**Scope:** Project-level (team-shared)

---

## Installed MCP Servers

### 1. Puppeteer MCP Server (Browser Automation)

**Status:** ⚠️ Deprecated but Functional
**Type:** stdio
**Command:** `npx -y @modelcontextprotocol/server-puppeteer`

**Capabilities:**
- Full browser automation
- Screenshot capture
- JavaScript execution on web pages
- Interactive web element manipulation
- Form filling and submission

**Configuration:**
```json
{
  "puppeteer": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
    "env": {}
  }
}
```

**Notes:**
- Package is officially deprecated as of May 2025
- Still fully functional despite deprecation warnings
- Runs headless browser by default with npx
- For headless Chromium in Docker: use `docker run -i --rm --init -e DOCKER_CONTAINER=true mcp/puppeteer`

**Security Warning:** This server can access local files and internal IP addresses since it runs a browser on your machine.

---

### 2. Fetch MCP Server (Web Content Retrieval)

**Status:** ✅ Active
**Type:** stdio
**Command:** `uvx mcp-server-fetch`

**Capabilities:**
- Fetch web page content
- Convert HTML to markdown
- Customizable robots.txt handling
- Proxy support
- User-agent customization

**Configuration:**
```json
{
  "fetch": {
    "type": "stdio",
    "command": "uvx",
    "args": ["mcp-server-fetch"],
    "env": {}
  }
}
```

**Usage:**
- Tool name: `fetch`
- Parameters:
  - `url` (required): Web page URL
  - `max_length` (optional): Character limit for content
  - `start_index` (optional): Where to start content extraction

**Notes:**
- Lightweight alternative to full browser automation
- Best for static content extraction
- No API keys required
- Self-cleaning 15-minute cache

---

### 3. Web Browser MCP Server (Smart Content Extraction)

**Status:** ✅ Active
**Type:** stdio
**Command:** `uv tool run web-browser-mcp-server`

**Capabilities:**
- Smart content extraction using CSS selectors
- Async processing for performance
- Built-in error handling
- Timeout management
- Cross-platform Python-based

**Configuration:**
```json
{
  "web-browser": {
    "type": "stdio",
    "command": "uv",
    "args": ["tool", "run", "web-browser-mcp-server"],
    "env": {}
  }
}
```

**Environment Variables:**
- `REQUEST_TIMEOUT`: Default 30 seconds

**Usage:**
- Tool name: `browse_webpage`
- Parameters:
  - `url`: Target webpage
  - `selectors`: CSS selectors for targeted extraction

**Notes:**
- No API keys required
- Excellent for structured data extraction
- Uses BeautifulSoup4 under the hood
- Lightweight and fast

---

## Why Multiple Servers?

Each server serves different research needs:

| Server | Best For | Pros | Cons |
|--------|----------|------|------|
| **Puppeteer** | Interactive sites, JavaScript-heavy pages | Full browser control, screenshots | Deprecated, slower |
| **Fetch** | Static content, documentation | Fast, simple, cached | No JS execution |
| **Web Browser** | Targeted extraction, structured data | CSS selectors, efficient | Requires selector knowledge |

---

## Usage in Claude Code

### Automatic Tool Detection

Once the session restarts, Claude Code will automatically detect these MCP servers and their available tools. You can use them by referencing the tools in natural language:

**Examples:**
- "Use Puppeteer to browse to itch.io and find the top LittleJS games"
- "Fetch the content from the js13k winners page"
- "Use the web browser to extract all game titles from the jam results using CSS selectors"

### Manual Tool Invocation

If needed, you can explicitly request specific tools:
- `puppeteer_navigate` - Navigate to URL
- `puppeteer_screenshot` - Capture page screenshot
- `fetch` - Fetch and convert web content
- `browse_webpage` - Extract content with selectors

---

## Testing the Setup

### Quick Test Commands

After restarting the session, test each server:

```bash
# Test Fetch server
claude mcp test fetch

# Test Web Browser server
claude mcp test web-browser

# Test Puppeteer server
claude mcp test puppeteer
```

---

## Troubleshooting

### Server Not Responding

1. Check server is configured:
```bash
claude mcp list
```

2. Verify configuration file:
```bash
cat .mcp.json
```

3. Check for timeout issues:
```bash
export MCP_TIMEOUT=60000  # Increase to 60 seconds
```

### Puppeteer Deprecation Warnings

- Warnings are expected but don't affect functionality
- Server will continue working until fully removed from npm
- Consider migrating to Browserbase for long-term projects

### Permission Issues

- Ensure `uv` and `npx` are in PATH
- Check Docker is running (if using Docker Puppeteer)
- Verify network access for downloading packages

---

## Alternative Servers (Not Installed)

### Browserbase MCP Server

**Why Not Installed:**
- Requires API key and signup
- Paid service (no confirmed free tier)
- Overkill for current research needs

**To Install Later:**
```bash
claude mcp add --transport stdio --scope project \
  browserbase npx -- @browserbasehq/mcp-server-browserbase \
  --env BROWSERBASE_API_KEY=your_key \
  --env BROWSERBASE_PROJECT_ID=your_project_id
```

### Exa MCP Server (Code Search)

**Why Not Installed:**
- Focused on code search, not general web research
- Requires API key from dashboard.exa.ai

**To Install Later:**
```bash
npm install -g exa-mcp-server
claude mcp add --transport http --scope project \
  exa https://mcp.exa.ai/mcp
```

---

## Next Steps

1. **Restart Claude Code session** to activate MCP servers
2. **Begin enhanced research** using browser automation
3. **Document findings** in research reports
4. **Use Puppeteer for:**
   - itch.io game jam winner analysis
   - Interactive game demos
   - Screenshot capture of successful games
5. **Use Fetch for:**
   - Documentation pages
   - Static content sites
   - Quick content extraction
6. **Use Web Browser for:**
   - Structured data extraction
   - Targeted element scraping
   - Efficient content parsing

---

## References

- [MCP Documentation](https://modelcontextprotocol.io)
- [Claude Code MCP Guide](https://docs.claude.com/en/docs/claude-code/mcp)
- [Puppeteer MCP (Archived)](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer)
- [Fetch MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)
- [Web Browser MCP Server](https://github.com/blazickjp/web-browser-mcp-server)

---

**Version:** 1.0.0
**Last Updated:** 2025-10-14
**Status:** ✅ Ready for Use
