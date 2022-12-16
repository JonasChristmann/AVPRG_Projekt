import mido

output_ports = mido.get_output_names()
print("MIDI output ports: ", output_ports)
