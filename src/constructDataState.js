import Product from "./models/Product";
import Group from "./models/Group";

export default function constructDataState(data, namesData) {
  const names = Object.entries(namesData).reduce(
    (groupResult, [groupId, groupData]) => {
      const group = {
        groupName: groupData["groupName"],
        products: Object.entries(groupData["groupGoods"]).reduce(
          (productsResult, [id, productData]) => {
            const product = { name: productData.name };
            productsResult[id] = product;
            return productsResult;
          },
          {}
        ),
      };

      groupResult[groupId] = group;
      return groupResult;
    },
    {}
  );

  const arrayOfGoods = data.goods.map(({ USDPrice, groupId, quantity, id }) => {
    return { price: USDPrice, groupId, quantity, id };
  });

  const dataState = arrayOfGoods.reduce(
    (acc, product) => {
      const { groupId } = product;

      if (!acc.groups[groupId]) {
        acc.groups[groupId] = new Group({
          id: groupId,
          name: names[groupId].groupName,
        });
      }

      acc.products[product.id] = new Product({
        name: names[groupId].products[product.id].name,
        ...product,
      });

      return acc;
    },
    { groups: {}, products: {} }
  );

  return dataState;
}
