import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import './Navbar.sass'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
			<header className="header">
				<nav className="head-navbar navbar">
					<div className="container">
						<div className="navbar-brand">
							<Link to="/" className="navbar-item">
								<h1>Hello Japanese</h1>
							</Link>
						</div>
						<div className="navbar-end">
							{data.allWordpressPage.edges.map(edge => (
								<Link
									className="navbar-item"
									to={edge.node.slug}
									key={edge.node.slug}
								>
									{edge.node.title}
								</Link>
							))}
						</div>
					</div>
				</nav>
			</header>
    )}
  />
)

export default Navbar