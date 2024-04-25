/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    cat => cat.id === product.categoryId,
  );
  const user = usersFromServer.find(chel => chel.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const allPlusUsers = [...usersFromServer];

allPlusUsers.unshift({
  id: 0,
  name: 'All',
  sex: null,
});

const allPlusCategories = [...categoriesFromServer];

allPlusCategories.unshift({
  id: 0,
  title: 'All',
  icon: null,
  ownerId: null,
});

export const App = () => {
  const [query, setQuery] = useState('');
  const [sortedByName, setSortedByName] = useState(allPlusUsers[0].name);
  const [sortedByCategory, setSortedByCategory] = useState([
    allPlusCategories[0].title,
  ]);

  const visibleProducts = [...products].filter(item => {
    if (sortedByName === allPlusUsers[0].name) {
      return true;
    }

    return item.user.name === sortedByName;
  });

  const visibleProductsAfterInput = [...visibleProducts].filter(item =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const noResults = Boolean(visibleProductsAfterInput.length);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              {allPlusUsers.map(chel => (
                <a
                  key={chel.id}
                  onClick={() => setSortedByName(chel.name)}
                  data-cy="FilterAllUsers"
                  href="#/"
                  className={cn({ 'is-active': sortedByName === chel.name })}
                >
                  {chel.name}
                </a>
              ))}

              {/* <a data-cy="FilterAllUsers" href="#/">
                All
              </a>

              <a data-cy="FilterUser" href="#/">
                User 1
              </a>

              <a data-cy="FilterUser" href="#/" className="is-active">
                User 2
              </a>

              <a data-cy="FilterUser" href="#/">
                User 3
              </a> */}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={event => setQuery(event.target.value)}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              {allPlusCategories.map(item => (
                <a
                  onClick={() => {
                    if (item.title === allPlusCategories[0].title) {
                      return setSortedByCategory([allPlusCategories[0].title]);
                    }

                    if (sortedByCategory.includes(item.title)) {
                      const index = sortedByCategory.findIndex(item.title);
                      const copy = [...sortedByCategory].splice(index, 1);

                      return setSortedByCategory(copy.splice(index, 1));
                    }

                    return setSortedByCategory([
                      ...sortedByCategory,
                      item.title,
                    ]);
                  }}
                  key={item.id}
                  href="#/"
                  data-cy="AllCategories"
                  className={cn('button', {
                    'is-success mr-6 is-outlined': item.title === 'All',
                    'mr-2 my-1': item.title !== 'All',
                    'is-info': sortedByCategory.includes(item.title),
                  })}
                >
                  {item.title}
                </a>
              ))}
              {/* <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a> */}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {noResults || (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleProductsAfterInput.map(item => (
                <tr data-cy="Product" key={item.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {item.id}
                  </td>

                  <td data-cy="ProductName">{item.name}</td>
                  <td data-cy="ProductCategory">{`${item.category.icon} - ${item.category.title}`}</td>

                  <td
                    data-cy="ProductUser"
                    className={cn({
                      'has-text-link': item.user.sex === 'm',
                      'has-text-danger': item.user.sex === 'f',
                    })}
                  >
                    {item.user.name}
                  </td>
                </tr>
              ))}

              {/* <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                1
              </td>

              <td data-cy="ProductName">Milk</td>
              <td data-cy="ProductCategory">🍺 - Drinks</td>

              <td data-cy="ProductUser" className="has-text-link">
                Max
              </td>
            </tr>

            <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                2
              </td>

              <td data-cy="ProductName">Bread</td>
              <td data-cy="ProductCategory">🍞 - Grocery</td>

              <td data-cy="ProductUser" className="has-text-danger">
                Anna
              </td>
            </tr>

            <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                3
              </td>

              <td data-cy="ProductName">iPhone</td>
              <td data-cy="ProductCategory">💻 - Electronics</td>

              <td data-cy="ProductUser" className="has-text-link">
                Roma
              </td>
            </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
