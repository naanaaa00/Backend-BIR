// associations.js
import Books from './BookModel.js';
import Pages from './PagesModel.js';

Books.hasMany(Pages, { foreignKey: 'relatedBookId', as: 'relatedBook' });
Pages.belongsTo(Books, { foreignKey: 'relatedBookId', as: 'relatedBook' });

export { Books, Pages };