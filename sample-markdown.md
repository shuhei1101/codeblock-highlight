# コードブロックハイライトのテスト

このファイルでは、異なる言語のコードブロックに対するハイライト機能をテストします。

## Pythonコードブロック

```python
def hello_world():
    print("Hello, World!")
    
    for i in range(5):
        print(f"Count: {i}")
        
    return True
```

## JavaScriptコードブロック

```javascript
function helloWorld() {
  console.log("Hello, World!");
  
  for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`);
  }
  
  return true;
}
```

## 言語指定なしコードブロック

```
# This is a code block with no language specified
print("Hello")
```

## タイプスクリプトコードブロック

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return `Hello, ${person.name}!`;
}

const user: Person = {
  name: "John",
  age: 30
};

console.log(greet(user));
```
