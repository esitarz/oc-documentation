import { Link } from '@material-ui/core'
import React from 'react'

/**
 * Takes in a path and resolves to portal URL
 */

function withPrefix(path) {
  const portalBaseUrl = getBaseUrl()
  return [portalBaseUrl, normalizePath(path)].join(`/`)
}

function getBaseUrl() {
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  let port = ''
  if (window.location.port) {
    port = `:${window.location.port}`
  }
  return `${protocol}//${hostname}${port}`
}

function normalizePath(path) {
  // removes extra fourward slashes to ensure a proper URL
  if (path.charAt(0) === '/') {
    return path.replace(/\//, ``)
  }
  return path
}

interface PortalLinkProps {
  to: string
}

export class PortalLink extends React.Component<PortalLinkProps> {
  constructor(props) {
    super(props)
  }

  public render() {
    const { to, children } = this.props
    return <Link onClick={() => navigate(to)}>{children}</Link>
  }
}

export function navigate(path) {
  var prefixedTo = withPrefix(path)
  window.location.assign(prefixedTo)
}
