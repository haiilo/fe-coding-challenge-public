import { Product } from './product';
import { Page } from './page';

export const productPage1Mock: Page<Product> = {
  content: [
    {
      url: 'http://test1.com',
      title: 'My product 1',
      description: 'best product ever',
      image: null,
      categories: ['avia', 'cars', 'trains']
    },
    {
      url: 'http://test2.com',
      title: 'My product 2',
      description: 'another best product ever',
      image: null,
      categories: ['banana', 'apple', 'kiwi']
    },
    {
      url: 'http://test3.com',
      title: 'My product 3',
      description: 'one more best product ever',
      image: 'http://test-image.com',
      categories: ['ocean', 'country', 'city']
    }
  ],
  more: true
};

export const productPage2Mock: Page<Product> = {
  content: [
    {
      url: 'http://test4.com',
      title: 'My product 4',
      description: 'best product ever',
      image: null,
      categories: ['avia', 'cars', 'trains']
    },
    {
      url: 'http://test5.com',
      title: 'My product 5',
      description: 'another best product ever',
      image: null,
      categories: ['banana', 'apple', 'kiwi']
    },
    {
      url: 'http://test6.com',
      title: 'My product 6',
      description: 'one more best product ever',
      image: 'http://test-image.com',
      categories: ['ocean', 'country', 'city']
    }
  ],
  more: false
};

export const productMock: Product = {
  url: 'http://test.com',
  title: 'My product',
  description: 'best product ever',
  image: 'http://test-image.com',
  categories: ['ocean', 'country', 'city']
};
