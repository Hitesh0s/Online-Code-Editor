export const codeSnippets = {
  javascript: 
`// JavaScript Template
console.log("Hello, World!");

// Example function
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120`,
  
  python: `# Python Template
print("Hello, World!")
  
# Example function
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)
  
print(factorial(5)) # 120`,
  
  java: 
`// Java Template
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    
        // Example function call
        System.out.println(factorial(5)); // 120
    }
      
    // Example function
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}`,
  
    cpp: 
`// C++ Template
#include <iostream>
using namespace std;

// Example function
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
 
int main() {
    cout << "Hello, World!" << endl;
    cout << factorial(5) << endl; // 120
    return 0;
}`,

    c: 
`// C Template
#include <stdio.h>
  
// Example function
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
  
int main() {
    printf("Hello, World!\\n");
    printf("%d\\n", factorial(5)); // 120
    return 0;
}`

};