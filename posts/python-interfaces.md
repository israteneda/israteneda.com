---
title: 'Python Interfaces'
date: '2021-03-16'
---

Since Python uses [duck typing](https://docs.python.org/2/glossary.html#term-duck-typing), interfaces are not necessary. 
The original attitude, which held sway for many years, is that you don't need them: Python works on the [EAFP](https://docs.python.org/3/glossary.html#term-eafp) (easier to ask forgiveness than permission) principle.

This works pretty well, but there are definite use cases for interfaces, especially with larger software projects. The final decision in Python was to provide the abc module, which allows you to write [abstract base classes](https://www.python.org/dev/peps/pep-3119/).

##### Example

```
import abc

class Piece(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def move(self, **kargs):
        raise NotImplementedError 


class Queen(Piece):
    def move(self, square):
        # Specific implementation for the Queen's movements
        pass


class King(Piece):
    pass


# Allows you to create an instance of the Queen class
queen = Queen()


# Does not allow you to create an instance of the King class, 
# because the abstract method move() is not implemented.
king = King()
```

#### References

[Implementing an Interface in Python](https://realpython.com/python-interface/)

[How do I implement interfaces in python?](https://stackoverflow.com/questions/2124190/how-do-i-implement-interfaces-in-python?answertab=oldest#tab-top)

[Java abstract/interface design in Python](https://stackoverflow.com/questions/8181576/java-abstract-interface-design-in-python/8181859#8181859)