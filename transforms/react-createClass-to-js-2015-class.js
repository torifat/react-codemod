export default function(file, api) {

  const j = api.jscodeshift;

  return j(file.source)
    .find(j.VariableDeclaration, {
    	declarations: [
        {
          init: {
            callee: {
              object: {
                name: 'React'
              },
              property: {
                name: 'createClass'
              }
            }
          }
        }
      ]
    })
    .replaceWith(
      p => {
        const declaration = p.value.declarations[0];
        const properties = declaration.init.arguments[0].properties;
        const methods = properties.map((method) => {

          if (method.key.name === 'getInitialState') {
            const blocks = method.value.body.body,
                  lastBlock = blocks[blocks.length - 1];
            if (lastBlock.type === 'ReturnStatement' && blocks.length === 1) {
              return j.classProperty(
                j.identifier('state'),
                method.value.body.body[0].argument,
                null
              );
            }
          }

          return j.methodDefinition(
            'method',
            j.identifier(method.key.name),
            j(method).find(j.FunctionExpression).get().value
          )
        });

        return j.classDeclaration(
          j.identifier(declaration.id.name),
          j.classBody(methods),
          j.identifier('React')
        );
      }
    )
    .toSource();
};
